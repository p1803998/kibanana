<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-public](./kibana-plugin-public.md) &gt; [ApplicationStart](./kibana-plugin-public.applicationstart.md)

## ApplicationStart interface


<b>Signature:</b>

```typescript
export interface ApplicationStart 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [capabilities](./kibana-plugin-public.applicationstart.capabilities.md) | <code>RecursiveReadonly&lt;Capabilities&gt;</code> | Gets the read-only capabilities. |

## Methods

|  Method | Description |
|  --- | --- |
|  [getUrlForApp(appId, options)](./kibana-plugin-public.applicationstart.geturlforapp.md) | Returns a relative URL to a given app, including the global base path. |
|  [navigateToApp(appId, options)](./kibana-plugin-public.applicationstart.navigatetoapp.md) | Navigiate to a given app |
|  [registerMountContext(contextName, provider)](./kibana-plugin-public.applicationstart.registermountcontext.md) | Register a context provider for application mounting. Will only be available to applications that depend on the plugin that registered this context. |

