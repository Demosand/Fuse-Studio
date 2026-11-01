--!nonstrict
-- Fuse Studio original procedural icons: no third-party Roblox asset IDs needed.
local M={}
local function box(parent,name,pos,size,color,radius,rotation)
 local o=Instance.new("Frame")
 o.Name=name;o.Size=size;o.Position=pos;o.BorderSizePixel=0
 o.BackgroundColor3=color;o.Rotation=rotation or 0
 o.ZIndex=parent.ZIndex+1
 if radius then local c=Instance.new("UICorner");c.CornerRadius=UDim.new(radius,0);c.Parent=o end
 o.Parent=parent;return o
end
local function stroke(parent,color,size)
 local s=Instance.new("UIStroke");s.Color=color;s.Thickness=size;s.Parent=parent
end
local function label(parent,value)
 local t=Instance.new("TextLabel")
 t.Name="NativeLabel";t.Size=UDim2.fromScale(1,1);t.BackgroundTransparency=1
 t.Text=value;t.TextScaled=true;t.TextColor3=Color3.fromRGB(255,255,255)
 t.Font=Enum.Font.GothamBold;t.TextStrokeTransparency=0.2
 t.TextStrokeColor3=Color3.fromRGB(24,17,48);t.ZIndex=parent.ZIndex+2
 t.Parent=parent;return t
end
function M.Draw(host,kind)
 local root=Instance.new("Frame")
 root.Name="FuseNativeIcon";root.Size=UDim2.fromScale(1,1)
 root.BackgroundTransparency=1;root.ZIndex=host.ZIndex+1;root.Parent=host
 local dark=Color3.fromRGB(28,21,52)
 local white=Color3.fromRGB(242,245,255)
 if kind=="basket" or kind=="shop" then
  local handle=box(root,"Handle",UDim2.fromScale(.32,.12),UDim2.fromScale(.36,.38),
    Color3.fromRGB(255,183,201),.32);stroke(handle,dark,2)
  local body=box(root,"Basket",UDim2.fromScale(.14,.43),UDim2.fromScale(.72,.47),
    Color3.fromRGB(244,75,125),.12);stroke(body,dark,2.2)
  for i=1,3 do box(body,"Detail",UDim2.fromScale(i*.23,.16),
    UDim2.fromScale(.045,.66),Color3.fromRGB(255,184,200),.15) end
  box(root,"Rim",UDim2.fromScale(.1,.41),UDim2.fromScale(.8,.1),
    Color3.fromRGB(255,189,216),.1)
 elseif kind=="robux" then
  local coin=box(root,"Coin",UDim2.fromScale(.19,.19),UDim2.fromScale(.62,.62),
    Color3.fromRGB(108,238,101),.06,45)
  stroke(coin,dark,2.2)
  box(coin,"Center",UDim2.fromScale(.32,.32),UDim2.fromScale(.36,.36),
    Color3.fromRGB(25,102,56),.03)
 elseif kind=="gamepad" or kind=="gamepad-dark" or kind=="gamepad-light" then
  local bg=kind=="gamepad-dark" and dark or white
  local body=box(root,"Controller",UDim2.fromScale(.07,.28),UDim2.fromScale(.86,.5),bg,.37)
  stroke(body,kind=="gamepad-dark" and white or dark,2.1)
  box(body,"DPadV",UDim2.fromScale(.24,.24),UDim2.fromScale(.08,.55),dark,.05)
  box(body,"DPadH",UDim2.fromScale(.15,.43),UDim2.fromScale(.26,.13),dark,.05)
  box(body,"A",UDim2.fromScale(.7,.30),UDim2.fromScale(.13,.2),Color3.fromRGB(255,180,89),1)
  box(body,"B",UDim2.fromScale(.83,.50),UDim2.fromScale(.1,.16),Color3.fromRGB(125,216,248),1)
 elseif kind=="banana" then
  label(root,"🍌")
 elseif kind=="social" then
  label(root,"@")
 else
  label(root,"•")
 end
 return root
end
return table.freeze(M)
