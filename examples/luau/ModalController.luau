--!strict
-- Kira Studio: interruption-safe modal controller for a GuiObject.
-- Construct in a LocalScript; panel must be a child of a ScreenGui.
local TweenService = game:GetService("TweenService")
local GuiService = game:GetService("GuiService")

local ModalController = {}
ModalController.__index = ModalController

type ModalData = {
    panel: GuiObject,
    scale: UIScale,
    activeTween: Tween?,
    version: number,
    destroyed: boolean,
    open: boolean,
}
export type ModalController = typeof(setmetatable({} :: ModalData, ModalController))

function ModalController.new(panel: GuiObject): ModalController
    local s = panel:FindFirstChildOfClass("UIScale")
    if not s then s = Instance.new("UIScale"); s.Parent = panel end
    panel.Visible = false
    return setmetatable({panel=panel, scale=s, activeTween=nil, version=0, destroyed=false, open=false}, ModalController)
end

function ModalController.setOpen(self: ModalController, shouldOpen: boolean)
    if self.destroyed then return end
    if self.open == shouldOpen then return end
    self.version += 1
    local version = self.version
    self.open = shouldOpen
    if self.activeTween then self.activeTween:Cancel(); self.activeTween=nil end
    if shouldOpen then
        self.panel.Visible = true
        self.panel.Active = true
        self.scale.Scale = math.min(self.scale.Scale, 0.96)
    else
        self.panel.Active = false
    end
    local target = if shouldOpen then 1 else 0.96
    if GuiService.ReducedMotionEnabled then
        self.scale.Scale = target
        self.panel.Visible = shouldOpen
        return
    end
    local tween = TweenService:Create(self.scale, TweenInfo.new(0.20, Enum.EasingStyle.Quart, Enum.EasingDirection.Out), {Scale=target})
    self.activeTween = tween
    local connection: RBXScriptConnection?
    connection = tween.Completed:Connect(function(state)
        if connection then connection:Disconnect() end
        if self.destroyed or self.version ~= version then return end
        if state == Enum.PlaybackState.Completed then
            self.activeTween = nil
            if not self.open then self.panel.Visible=false end
        end
    end)
    tween:Play()
end

function ModalController.destroy(self: ModalController)
    if self.destroyed then return end
    self.destroyed=true
    self.version += 1
    if self.activeTween then self.activeTween:Cancel(); self.activeTween=nil end
    self.panel.Visible=false
end

return ModalController
