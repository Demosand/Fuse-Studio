--!strict
-- Safe access wrapper for the original (unchanged) CheckUIIcons registry.
local Source = require(script.Parent.CheckUIIcons)
local Guard = require(script.Parent.StudAssetGuard)
local Safe = {}

function Safe.Get(...: string): string
  local id = Source.Get(...)
  local kind = Guard.NativeToken(id)
  if kind then return "fuse://" .. kind end
  return Guard.Resolve(id)
end

function Safe.Search(term: string): {{Path: string, AssetId: string}}
  local results: {{Path: string, AssetId: string}} = {}
  for _, item in ipairs(Source.Search(term)) do
    local kind = Guard.NativeToken(item.AssetId)
    table.insert(results, {Path = item.Path, AssetId = if kind then "fuse://" .. kind else item.AssetId})
  end
  return results
end

return table.freeze(Safe)
