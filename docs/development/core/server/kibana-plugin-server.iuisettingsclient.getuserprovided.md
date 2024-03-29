<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-server](./kibana-plugin-server.md) &gt; [IUiSettingsClient](./kibana-plugin-server.iuisettingsclient.md) &gt; [getUserProvided](./kibana-plugin-server.iuisettingsclient.getuserprovided.md)

## IUiSettingsClient.getUserProvided property

Retrieves a set of all uiSettings values set by the user.

<b>Signature:</b>

```typescript
getUserProvided: <T extends SavedObjectAttribute = any>() => Promise<Record<string, {
        userValue?: T;
        isOverridden?: boolean;
    }>>;
```
