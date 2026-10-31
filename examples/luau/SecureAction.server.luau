--!strict
-- Kira Studio server-side validation skeleton. Adapt path and game-specific state.
-- Script in ServerScriptService. Create ReplicatedStorage.Remotes.RequestInteract on server.
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remotes = ReplicatedStorage:FindFirstChild("Remotes")
if not remotes then
    remotes = Instance.new("Folder")
    remotes.Name = "Remotes"
    remotes.Parent = ReplicatedStorage
end
local remote = remotes:FindFirstChild("RequestInteract") :: RemoteEvent?
if not remote then
    remote = Instance.new("RemoteEvent")
    remote.Name = "RequestInteract"
    remote.Parent = remotes
end

local lastAction: { [Player]: number } = {}
local COOLDOWN = 0.20
local MAX_DIST = 14

remote.OnServerEvent:Connect(function(player: Player, objectId: unknown)
    if typeof(objectId) ~= "string" or #objectId > 64 or #objectId < 1 then return end
    if not string.match(objectId, "^[%w_%-]+$") then return end
    local now = os.clock()
    if now - (lastAction[player] or -math.huge) < COOLDOWN then return end
    lastAction[player] = now
    local character = player.Character
    local root = character and character:FindFirstChild("HumanoidRootPart")
    local humanoid = character and character:FindFirstChildOfClass("Humanoid")
    if not root or not root:IsA("BasePart") or not humanoid or humanoid.Health <= 0 then return end
    -- A server-defined object registry is better than blindly searching Workspace by client id.
    local interactables = workspace:FindFirstChild("Interactables")
    local target = interactables and interactables:FindFirstChild(objectId)
    if not target or not target:IsA("BasePart") then return end
    if (root.Position - target.Position).Magnitude > MAX_DIST then return end
    -- TODO: permission, line of sight, current round, ownership, item state.
    -- TODO: invoke your SERVER-OWNED interaction logic here. Never accept client reward/damage.
end)

Players.PlayerRemoving:Connect(function(p) lastAction[p]=nil end)
