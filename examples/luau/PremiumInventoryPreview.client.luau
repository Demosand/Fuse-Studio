--!strict
-- Kira Studio UI showcase; LocalScript in StarterPlayerScripts.
-- Entirely visual/local demo, NOT connected to real player inventory or purchases.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")
local GuiService = game:GetService("GuiService")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local COLOR = {
    backdrop = Color3.fromRGB(9, 13, 25),
    panel = Color3.fromRGB(19, 27, 44),
    card = Color3.fromRGB(30, 40, 60),
    text = Color3.fromRGB(238, 246, 255),
    muted = Color3.fromRGB(157, 176, 198),
    accent = Color3.fromRGB(113, 205, 235),
    stroke = Color3.fromRGB(76, 99, 128),
}
local items = {
    {name="PHANTOM", rarity="RARE", symbol="✧"},
    {name="EMBER", rarity="EPIC", symbol="◆"},
    {name="PULSE", rarity="COMMON", symbol="◇"},
    {name="NOVA", rarity="EPIC", symbol="✦"},
    {name="ECHO", rarity="RARE", symbol="◈"},
    {name="VECTOR", rarity="COMMON", symbol="⬡"},
}
local function create(className: string, props: {[string]: any}, parent: Instance): Instance
    local o = Instance.new(className)
    for k,v in props do (o :: any)[k] = v end
    o.Parent = parent
    return o
end
local function corner(parent: Instance, radius: number)
    create("UICorner",{CornerRadius=UDim.new(0,radius)},parent)
end
local function outline(parent: Instance, transparency: number)
    create("UIStroke",{Color=COLOR.stroke,Thickness=1,Transparency=transparency,ApplyStrokeMode=Enum.ApplyStrokeMode.Border},parent)
end
local function label(parent: Instance, text: string, size: number, color: Color3, bold: boolean): TextLabel
    return create("TextLabel", {
        BackgroundTransparency=1, Text=text, TextColor3=color, TextSize=size,
        Font=if bold then Enum.Font.GothamBold else Enum.Font.Gotham,
        TextXAlignment=Enum.TextXAlignment.Left, TextTruncate=Enum.TextTruncate.AtEnd,
    },parent) :: TextLabel
end

local screen = create("ScreenGui",{Name="KiraInventoryPreview",ResetOnSpawn=false,DisplayOrder=50},playerGui) :: ScreenGui
local panel = create("Frame",{
    Name="InventoryPanel",AnchorPoint=Vector2.new(.5,.5),Position=UDim2.fromScale(.5,.5),
    Size=UDim2.new(.9,0,.8,0),BackgroundColor3=COLOR.panel,BorderSizePixel=0,
},screen) :: Frame
corner(panel,18);outline(panel,.4)
create("UISizeConstraint",{MaxSize=Vector2.new(730,680),MinSize=Vector2.new(260,280)},panel)
local scale = create("UIScale",{Scale=1},panel) :: UIScale
local pad = create("UIPadding",{PaddingTop=UDim.new(0,22),PaddingBottom=UDim.new(0,20),PaddingLeft=UDim.new(0,22),PaddingRight=UDim.new(0,22)},panel)

local title = label(panel,"// INVENTORY",26,COLOR.text,true)
title.Size=UDim2.new(1,-50,0,32)
local subtitle = label(panel,"GEAR  /  COLLECTION  /  LOADOUT",12,COLOR.muted,false)
subtitle.Position=UDim2.fromOffset(0,37)
subtitle.Size=UDim2.new(1,0,0,20)

local close = create("TextButton",{Name="Close",Text="×",TextSize=25,Font=Enum.Font.GothamBold,
 TextColor3=COLOR.text,BackgroundColor3=COLOR.card,BorderSizePixel=0,
 AnchorPoint=Vector2.new(1,0),Position=UDim2.new(1,0,0,0),Size=UDim2.fromOffset(38,38),AutoButtonColor=false,Selectable=true},panel) :: TextButton
corner(close,10)

local line = create("Frame",{Name="Divider",BackgroundColor3=COLOR.stroke,BackgroundTransparency=.55,BorderSizePixel=0,
Position=UDim2.fromOffset(0,68),Size=UDim2.new(1,0,0,1)},panel)

local body = create("ScrollingFrame",{
 Name="Items",BackgroundTransparency=1,BorderSizePixel=0,ScrollBarThickness=3,ScrollBarImageColor3=COLOR.accent,
 Position=UDim2.fromOffset(0,83),Size=UDim2.new(1,0,1,-157),CanvasSize=UDim2.fromOffset(0,0),
 AutomaticCanvasSize=Enum.AutomaticSize.Y,ScrollingDirection=Enum.ScrollingDirection.Y,
},panel) :: ScrollingFrame
local grid = create("UIGridLayout",{
 FillDirection=Enum.FillDirection.Horizontal,FillDirectionMaxCells=3,
 CellPadding=UDim2.new(.02,0,0,9),CellSize=UDim2.new(.31,0,0,94),
 SortOrder=Enum.SortOrder.LayoutOrder,HorizontalAlignment=Enum.HorizontalAlignment.Center,
},body) :: UIGridLayout
local detail = label(panel,"SELECT AN ITEM  •  DETAILS APPEAR HERE",13,COLOR.muted,false)
detail.AnchorPoint=Vector2.new(0,1)
detail.Position=UDim2.new(0,0,1,-18)
detail.Size=UDim2.new(1,0,0,26)
local hint = label(panel,"KIRA // STUDIO V2   •   VISUAL DEMO",10,COLOR.accent,true)
hint.AnchorPoint=Vector2.new(0,1)
hint.Position=UDim2.new(0,0,1,0)
hint.Size=UDim2.new(1,0,0,15)

local cards: {TextButton} = {}
local selected: number? = nil
for i,item in items do
    local card = create("TextButton",{Name="Slot"..i,Text="",BackgroundColor3=COLOR.card,BorderSizePixel=0,
        AutoButtonColor=false,Selectable=true,LayoutOrder=i},body) :: TextButton
    corner(card,12);outline(card,.70)
    local symbol=label(card,item.symbol,31,COLOR.accent,true)
    symbol.Position=UDim2.fromOffset(12,7);symbol.Size=UDim2.new(1,-20,0,38)
    local name=label(card,item.name,14,COLOR.text,true)
    name.Position=UDim2.new(0,12,1,-36);name.Size=UDim2.new(1,-18,0,20)
    local rarity=label(card,item.rarity,10,COLOR.muted,false)
    rarity.Position=UDim2.new(0,12,1,-18);rarity.Size=UDim2.new(1,-18,0,15)
    local cardScale=create("UIScale",{Scale=1},card) :: UIScale
    card.Activated:Connect(function()
        selected=i
        detail.Text="SELECTED: "..item.name.."  /  "..item.rarity
        for j,other in cards do
            local stroke=other:FindFirstChildOfClass("UIStroke")
            if stroke then stroke.Color=if j==i then COLOR.accent else COLOR.stroke; stroke.Transparency=if j==i then 0 else .7 end
        end
        if not GuiService.ReducedMotionEnabled then
            local t=TweenService:Create(cardScale,TweenInfo.new(.09,Enum.EasingStyle.Quad),{Scale=.96})
            t:Play()
            t.Completed:Once(function()
                if card.Parent then TweenService:Create(cardScale,TweenInfo.new(.17,Enum.EasingStyle.Back,Enum.EasingDirection.Out),{Scale=1}):Play() end
            end)
        end
    end)
    table.insert(cards,card)
end

local opener = create("TextButton",{Name="OpenInventory",Text="OPEN INVENTORY",TextSize=12,Font=Enum.Font.GothamBold,
 TextColor3=COLOR.text,BackgroundColor3=COLOR.panel,BorderSizePixel=0,
 Position=UDim2.fromOffset(16,75),Size=UDim2.fromOffset(152,42),Selectable=true},screen) :: TextButton
corner(opener,12);outline(opener,.3)
local visible=true
local version=0
local active: Tween? = nil
local function setOpen(state: boolean)
    if state==visible then return end
    visible=state
    version+=1
    local v=version
    if active then active:Cancel();active=nil end
    if state then panel.Visible=true end
    if GuiService.ReducedMotionEnabled then
        scale.Scale=if state then 1 else .95
        panel.Visible=state
        return
    end
    local tween=TweenService:Create(scale,TweenInfo.new(.18,Enum.EasingStyle.Quart,Enum.EasingDirection.Out),
        {Scale=if state then 1 else .95})
    active=tween
    tween.Completed:Once(function(playback)
        if v~=version then return end
        if playback==Enum.PlaybackState.Completed and not state then panel.Visible=false end
        active=nil
    end)
    tween:Play()
end
close.Activated:Connect(function() setOpen(false) end)
opener.Activated:Connect(function() setOpen(true) end)
UserInputService.InputBegan:Connect(function(input: InputObject,processed: boolean)
    if processed then return end
    if input.KeyCode==Enum.KeyCode.I then setOpen(not visible) end
end)
-- This demo intentionally has no real DataStore or server-side item granting.
