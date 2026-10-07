<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the reusable home page configurable for focused service landing pages so shared presentation stays consistent without duplicating route content.
- Render the private-master experience only for the index route, composing the unchanged shared ProcessPhotos through children; other landing pages retain HomePage to isolate homepage changes.
- Homepage contact actions use a shared slide-confirmation dialog before fixed contact destinations; this is a client-side accidental/automated-click barrier, not an authorization or CAPTCHA mechanism.
