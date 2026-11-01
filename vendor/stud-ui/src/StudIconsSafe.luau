--!strict
-- Safe access wrapper for the original (unchanged) CheckUIIcons registry.
local Source = require(script.Parent.CheckUIIcons)
local Guard = require(script.Parent.StudAssetGuard)
local Safe = {}

function Safe.Get(...: string): string
  return Guard.Resolve(Source.Get(...))
end

function Safe.Search(term: string): {{Path: string, AssetId: string}}
  local results: {{Path: string, AssetId: string}} = {}
  for _, item in ipairs(Source.Search(term)) do
    if not Guard.IsReported(item.AssetId) then
      table.insert(results, item)
    end
  end
  return results
end

return table.freeze(Safe)
