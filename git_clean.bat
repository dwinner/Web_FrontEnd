for /d /r "." %%d in (bin) do @if exist "%%d" rd /s/q "%%d"
for /d /r "." %%d in (obj) do @if exist "%%d" rd /s/q "%%d"
for /d /r "." %%d in (packages) do @if exist "%%d" rd /s/q "%%d"
for /d /r "." %%d in (.nuget) do @if exist "%%d" rd /s/q "%%d"
for /d /r "." %%d in (Debug) do @if exist "%%d" rd /s/q "%%d"
for /d /r "." %%d in (Release) do @if exist "%%d" rd /s/q "%%d"
for /d /r "." %%d in (TestResults) do @if exist "%%d" rd /s/q "%%d"
for /d /r "." %%d in (__MACOSX) do @if exist "%%d" rd /s/q "%%d"
for /d /r "." %%d in (.vs) do @if exist "%%d" rd /s/q "%%d"
for /d /r "." %%d in (.idea) do @if exist "%%d" rd /s/q "%%d"
del /f /s /q .\*.sdf
del /f /s /q .\*.user
del /f /s /q .\*.DS_Store
del /f /s /q .\*.exe
del /f /s /q .\*.class
git clean -xfd
pause