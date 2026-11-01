--!nonstrict
-- Fuse Studio adapter: uses upstream StudUI without modifying its MIT source.
-- Replaces community-reported missing decorative IDs with Roblox-native GUI.
local UI = require(script.Parent.StudUI)
local Guard = require(script.Parent.StudAssetGuard)

-- The original CheckUIIcons has a separate read-only wrapper: StudIconsSafe.
-- Do NOT mistake the 19 reported IDs for a complete audit of 1022 icons.
for name, id in pairs(UI.Assets) do
  if Guard.IsReported(id) then UI.Assets[name] = "" end
end
for _, rarity in pairs(UI.Rarities) do
  if Guard.IsReported(rarity.panel) then rarity.panel = "" end
end

local function buildStuds(parent, z, alpha)
  local panel = Instance.new("Frame")
  panel.Name = "Studs"
  panel.Size = UDim2.fromScale(1, 1)
  panel.BackgroundTransparency = 1
  panel.ClipsDescendants = true
  panel.ZIndex = z or 6
  for row = 1, 2 do
    for column = 1, 6 do
      local stud = Instance.new("Frame")
      stud.Name = "ProceduralStud"
      stud.AnchorPoint = Vector2.new(0.5, 0.5)
      stud.Size = UDim2.fromOffset(8, 8)
      stud.Position = UDim2.new((column - 0.5) / 6, 0, (row - 0.5) / 2, 0)
      stud.BackgroundColor3 = Color3.new(1, 1, 1)
      stud.BackgroundTransparency = alpha or 0.83
      stud.BorderSizePixel = 0
      stud.ZIndex = panel.ZIndex
      local corner = Instance.new("UICorner")
      corner.CornerRadius = UDim.new(1, 0)
      corner.Parent = stud
      stud.Parent = panel
    end
  end
  panel.Parent = parent
  return panel
end

-- 12 simple native elements per overlay; adjust for mobile if many buttons.
function UI.StudsOverlay(parent, zIndex)
  return buildStuds(parent, zIndex, 0.86)
end

function UI.StudsFlat(parent, zIndex, transparency)
  return buildStuds(parent, zIndex, transparency or 0.86)
end

local originalImage = UI.Image
function UI.Image(parent, assetId, p)
  p = p or {}
  local flagged = Guard.IsReported(assetId)
  local actual = Guard.Resolve(assetId)
  local image = originalImage(parent, actual, p)
  -- Only decorate *known missing* IDs and Robux badges with placeholders.
  local label = if p.Name == "Piece" and actual == "" then "R$" else
    if flagged then "?" else nil
  if label then
    local text = Instance.new("TextLabel")
    text.Name = "FuseAssetFallback"
    text.Size = UDim2.fromScale(1, 1)
    text.BackgroundTransparency = 1
    text.Text = label
    text.Font = Enum.Font.GothamBold
    text.TextScaled = true
    text.TextColor3 = Color3.fromRGB(255, 255, 255)
    text.TextStrokeColor3 = Color3.fromRGB(38, 18, 65)
    text.TextStrokeTransparency = 0.15
    text.ZIndex = image.ZIndex + 1
    text.Parent = image
  end
  return image
end

local originalWindow = UI.Window
function UI.Window(gui, p)
  local opts = table.clone(p)
  if opts.Header == "image" and opts.HeaderImage == nil then
    opts.Header = "pink"
  end
  if Guard.IsReported(opts.HeaderImage) then
    opts.HeaderImage = nil
    opts.Header = "pink"
  end
  if Guard.IsReported(opts.Icon) then opts.Icon = "" end
  local window = originalWindow(gui, opts)
  return window
end

local originalProductCard = UI.ProductCard
function UI.ProductCard(parent, p)
  local card = originalProductCard(parent, p)
  local panel = card:FindFirstChild("Panneau")
  if panel and panel:IsA("ImageLabel") and panel.Image == "" then
    local rarity = UI.Rarities[p.Rarity or "Common"] or UI.Rarities.Common
    panel.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
    panel.BackgroundTransparency = 0
    local gradient = Instance.new("UIGradient")
    gradient.Color = rarity.text
    gradient.Rotation = 90
    gradient.Parent = panel
    local outline = Instance.new("UIStroke")
    outline.Color = Color3.fromRGB(36, 26, 56)
    outline.Thickness = 2
    outline.Parent = panel
  end
  return card
end

return UI
