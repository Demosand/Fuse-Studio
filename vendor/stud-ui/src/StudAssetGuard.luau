--!strict
-- Fuse Studio: a conservative safeguard for 19 community-reported inaccessible IDs.
-- An ID's presence in this list is NOT proof it was deleted for every Roblox account.
-- Run AuditAsync in Studio for your own experience to check load/permission results.
local ContentProvider = game:GetService("ContentProvider")
local Guard = {}

local REPORTED: {[string]: string} = {
  ["128758985973789"] = "Banana icon",
  ["80257872092187"] = "Discord gamepad outline 1",
  ["117542131956071"] = "Discord gamepad variant 2",
  ["78959709568458"] = "Discord gamepad outline 2",
  ["117065333515921"] = "Discord gamepad black",
  ["79504731314029"] = "Discord gamepad white",
  ["121258694194678"] = "Twitter bird white",
  ["140544932962041"] = "Stud tile pattern",
  ["108268925256584"] = "Pink shop header",
  ["120530633952826"] = "Shop basket",
  ["83084350609799"] = "Robux coin",
  ["89267995407736"] = "Rarity Common",
  ["131137889121430"] = "Rarity Uncommon",
  ["105083838865206"] = "Rarity Rare",
  ["101084229455301"] = "Rarity Epic",
  ["86850543324255"] = "Rarity Legendary",
  ["135658280761682"] = "Rarity Mythic",
  ["71658771409468"] = "Rarity Divine",
  ["121878407812617"] = "Rarity Cosmic",
}
Guard.Reported = table.freeze(REPORTED)

local function numeric(assetId: unknown): string
  return tostring(assetId or ""):match("%d+") or ""
end

function Guard.IsReported(assetId: unknown): boolean
  return REPORTED[numeric(assetId)] ~= nil
end

function Guard.Reason(assetId: unknown): string?
  return REPORTED[numeric(assetId)]
end

-- Native replacements for community-reported IDs; no new Roblox asset IDs needed.
local NATIVE: {[string]: string} = {
 ["128758985973789"]="banana",
 ["80257872092187"]="gamepad",
 ["117542131956071"]="gamepad",
 ["78959709568458"]="gamepad",
 ["117065333515921"]="gamepad-dark",
 ["79504731314029"]="gamepad-light",
 ["121258694194678"]="social",
 ["120530633952826"]="basket",
 ["83084350609799"]="robux",
}
function Guard.NativeToken(assetId: unknown): string?
 if type(assetId)=="string" and string.sub(assetId,1,7)=="fuse://" then
  return string.sub(assetId,8)
 end
 return NATIVE[numeric(assetId)]
end

-- Does not assume a visually similar Roblox asset is actually available.
function Guard.Resolve(assetId: unknown, approvedAlternative: string?): string
  if type(assetId)=="string" and string.sub(assetId,1,7)=="fuse://" then return "" end
  if not Guard.IsReported(assetId) then
    if type(assetId) == "string" then return assetId end
    return ""
  end
  if type(approvedAlternative) == "string" and approvedAlternative ~= ""
    and not Guard.IsReported(approvedAlternative) then
    return approvedAlternative
  end
  return ""
end

-- IMPORTANT: invoke from a Studio LocalScript only as an explicit audit action,
-- not for all 1022 icons on every spawn. Status can fail due to permissions,
-- moderation, missing asset, or connectivity. It is not proof of deletion.
function Guard.AuditAsync(ids: {string}?, onResult: ((string, Enum.AssetFetchStatus) -> ())?): {[string]: string}
  local assets: {Instance} = {}
  local results: {[string]: string} = {}
  local chosen = ids or {}
  if ids == nil then
    for id in pairs(REPORTED) do table.insert(chosen, id) end
  end
  for _, id in ipairs(chosen) do
    local image = Instance.new("ImageLabel")
    image.Name = "FuseStudAudit"
    image.Image = if id:find("rbxassetid://", 1, true) then id else "rbxassetid://" .. id
    table.insert(assets, image)
  end
  local ok, err = pcall(function()
    ContentProvider:PreloadAsync(assets, function(asset, status)
      results[tostring(asset)] = status.Name
      if onResult then onResult(tostring(asset), status) end
    end)
  end)
  for _, asset in ipairs(assets) do asset:Destroy() end
  if not ok then warn("[Fuse Stud AssetAudit] Preload failed: " .. tostring(err)) end
  return results
end

return table.freeze(Guard)
