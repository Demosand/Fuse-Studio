# Roblox Studio placement guide

```text
ReplicatedStorage/
  Shared/[Module].lua          -- ModuleScript, shared pure module
ServerScriptService/
  [Feature].server.lua         -- Script, authoritative logic
StarterPlayer/StarterPlayerScripts/
  [Feature].client.lua         -- LocalScript, input and cosmetic UI
```

**Setup:** create named RemoteEvents on the server; verify exact paths and dependencies.

**Test:** run 2 clients; check successful path, malicious payload, player leave/rejoin, respawn, low-end mobile UI. Provide all module source and scripts; don't leave placeholders requiring undefined libraries.
