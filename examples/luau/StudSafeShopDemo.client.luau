--!nonstrict
-- Fuse Studio 2.5 safe Stud demo: use as LocalScript in StarterPlayerScripts.
-- Required ModuleScripts in ReplicatedStorage: StudUI, StudMotion,
-- CheckUIIcons, StudAssetGuard, StudUISafe, StudIconsSafe, StudNativeIcons.
-- Cosmetic demo only: do NOT award items/currency in a client callback.
local Players = game:GetService("Players")
local RS = game:GetService("ReplicatedStorage")
local UI = require(RS:WaitForChild("StudUISafe"))
local Icons = require(RS:WaitForChild("StudIconsSafe"))
local Motion = require(RS:WaitForChild("StudMotion"))
local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
if playerGui:FindFirstChild("FuseStudDemo") then return end
local gui = UI.ScreenGui("FuseStudDemo", 12, {Parent=playerGui})
local window = UI.Window(gui, {
 Size=Vector2.new(650,440),
 Title="Demo Shop", Header="image", -- Safe wrapper uses native pink gradient.
 Icon=UI.Assets.Basket, -- Internal fuse://basket -> GUI-native shop basket.
 Visible=true
})
local demoButton = UI.Button(window.Corps, {
 Theme="green",Style="Stud",Text="Explore",
 Size=Vector2.new(190,62),
 Position=UDim2.fromOffset(320,78)
})
Motion.BindButton(demoButton,1.05,gui.Sons)
-- A formerly reported missing icon is drawn natively, not via Roblox asset ID.
UI.ItemSlot(window.Corps,{
 Name="BananaExample", Size=Vector2.new(100,110),
 Position=UDim2.fromOffset(90,125),
 Icon=Icons.Get("Nature/Banana/Banana 1st"),
 Title="Banana",Quantity="x1"
})
UI.ProductCard(window.Corps,{
 Name="RareDemo",Width=617,Height=168,
 Title="Rare Sample",Rarity="Rare",Stock="Preview",
 Price=nil,Robux=nil, -- No fake shop purchase transaction.
 Icon=Icons.Get("Social/Discord/Gamepad 2nd Outline")
}).Position=UDim2.fromOffset(16,245)
-- Preview only: connect purchases to server-authoritative RemoteEvents if needed.
