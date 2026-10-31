--!strict
-- Kira Studio: local UI animation primitive. ModuleScript for a LocalScript to require.
-- Call disconnect() when the button is destroyed/removed; does not implement business logic.
local TweenService = game:GetService("TweenService")
local GuiService = game:GetService("GuiService")

local UiMotion = {}

export type Binding = {
    disconnect: () -> (),
}

function UiMotion.bindButton(button: GuiButton): Binding
    local scale = button:FindFirstChildOfClass("UIScale")
    if not scale then
        scale = Instance.new("UIScale")
        scale.Parent = button
    end
    local alive = true
    local hovering = false
    local pressing = false
    local focused = false
    local current: Tween? = nil
    local connections: { RBXScriptConnection } = {}

    local function render()
        if not alive then return end
        if current then
            current:Cancel()
            current = nil
        end
        local target = if pressing then 0.95 else if (hovering or focused) then 1.035 else 1
        if GuiService.ReducedMotionEnabled then
            scale.Scale = target
        else
            local t = TweenService:Create(scale, TweenInfo.new(0.13, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Scale = target})
            current = t
            t:Play()
        end
    end

    table.insert(connections, button.MouseEnter:Connect(function() hovering=true; render() end))
    table.insert(connections, button.MouseLeave:Connect(function() hovering=false; pressing=false; render() end))
    table.insert(connections, button.MouseButton1Down:Connect(function() pressing=true; render() end))
    table.insert(connections, button.MouseButton1Up:Connect(function() pressing=false; render() end))
    table.insert(connections, button.SelectionGained:Connect(function() focused=true; render() end))
    table.insert(connections, button.SelectionLost:Connect(function() focused=false; pressing=false; render() end))
    -- Activated is for the caller to bind separately; it supports touch/keyboard/gamepad.
    table.insert(connections, button.Activated:Connect(function() pressing=false; render() end))
    return {
        disconnect = function()
            if not alive then return end
            alive=false
            if current then current:Cancel(); current=nil end
            for _, conn in connections do conn:Disconnect() end
            scale.Scale=1
        end
    }
end

return UiMotion
