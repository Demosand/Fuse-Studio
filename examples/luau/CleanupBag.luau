--!strict
-- Small owner-scoped cleanup helper. Use one bag per GUI/player/system instance.
local CleanupBag = {}
CleanupBag.__index = CleanupBag

type Item = RBXScriptConnection | Instance | Tween | () -> ()
type Data = { items: {Item}, destroyed: boolean }
export type CleanupBag = typeof(setmetatable({} :: Data, CleanupBag))

function CleanupBag.new(): CleanupBag
    return setmetatable({items={},destroyed=false},CleanupBag)
end
local function clean(item: Item)
    if typeof(item)=="RBXScriptConnection" then
        (item :: RBXScriptConnection):Disconnect()
    elseif typeof(item)=="Instance" then
        local inst = item :: Instance
        if inst:IsA("Tween") then (inst :: Tween):Cancel() end
        inst:Destroy()
    elseif type(item)=="function" then
        (item :: () -> ())()
    end
end
function CleanupBag.add(self: CleanupBag, item: Item): Item
    if self.destroyed then clean(item); return item end
    table.insert(self.items,item)
    return item
end
function CleanupBag.destroy(self: CleanupBag)
    if self.destroyed then return end
    self.destroyed=true
    for i=#self.items,1,-1 do
        local ok,err=pcall(clean,self.items[i])
        if not ok then warn("Cleanup failed:",err) end
    end
    table.clear(self.items)
end
return CleanupBag
