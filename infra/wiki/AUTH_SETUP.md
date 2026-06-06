# Authentication & Access Control

Wiki.js supports multiple auth strategies. Start with local-only (just you),
then add corporate authentication when the team grows.

## Phase 1: Local Auth (Now — Single Admin)

Deployed as-is, Wiki.js creates the admin account from `WIKI_ADMIN_EMAIL` on
first run. Self-registration is disabled.

```text
Administration → Authentication → Local → Self-Registration: OFF
```

No one else can log in. Only the admin can view and edit.

## Phase 2: Add Corporate SSO (Future)

When ready to add team members, pick one auth provider:

### Option A: Microsoft AD / Azure AD (OIDC)

```text
Administration → Authentication → OIDC → Add Provider

Provider Name: AD / Microsoft Entra
Issuer URI:     https://login.microsoftonline.com/{tenant-id}/v2.0
Client ID:      <app-registration-client-id>
Client Secret:  <app-registration-secret>
Unique ID:      sub
Email:          email
Display Name:   name
```

Register an app in Azure AD → grant `User.Read` → paste Client ID/Secret above.

### Option B: LDAP (on-prem AD, OpenLDAP)

```text
Administration → Authentication → LDAP → Add Server

Server URL:   ldap://your-domain-controller:389
Bind DN:      CN=svc-wiki,OU=Service Accounts,DC=yourcompany,DC=com
Bind Credentials:  <password>
Search Base:       OU=Users,DC=yourcompany,DC=com
Search Filter:     (&(objectClass=user)(sAMAccountName={{username}}))
```

### Option C: Google Workspace, Okta, GitHub, SAML

Wiki.js supports all of these natively — same pattern, just select the provider
and paste credentials from your IdP.

## Role-Based Access (RBAC)

After enabling SSO, assign roles:

| Role    | Permissions        | Use For                                |
| ------- | ------------------ | -------------------------------------- |
| Viewer  | Read only          | Product, stakeholders, read-only users |
| Editor  | Create & edit      | Writers, engineers, contributors       |
| Manager | Manage permissions | Section owners, leads                  |
| Admin   | Full access        | You (system owner)                     |

To scope access per folder:

```text
Administration → Namespaces → [namespace] → Security
→ Add Role Binding (Group / User → Role)
```

## Step-by-Step: Adding Your First Team Member

1. Enable the auth provider (AD/LDAP/OIDC)
2. Go to `Administration → Authentication → <provider> → Import`
3. Import users or groups
4. Go to `Administration → Namespaces → (choose folder)`
5. Click `Security → Add Role Binding`
6. Select the user/group → assign `Editor`
7. Done — they log in with their corporate credentials

> **Tip**: Use AD groups, not individual users, for role bindings. Assign
> `Engineering-Contributors` group as Editor, not each person one by one.

## Related

- [GitHub Sync](GITHUB_SYNC.md) — sync content bidirectionally
- [Backup Scripts](scripts/backup.sh) — backup auth config too
