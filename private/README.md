# Private AI context

Create `.IAinformation.md` in this directory from the tracked example. The real file is ignored by Git and mounted outside nginx's public web root.

```bash
cp private/.IAinformation.example.md private/.IAinformation.md
chmod 600 private/.IAinformation.md
```

The backend reads the file for every AI request, so edits are available immediately without rebuilding or restarting the container.

This is conditional AI context, not a secret vault. The configured AI provider receives its contents, and a visitor may be able to obtain a fact if the model decides it is relevant. Never store passwords, API keys, tokens or credentials here.
