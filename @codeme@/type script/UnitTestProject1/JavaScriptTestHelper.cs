using System;
using System.IO;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MSScriptControl;

namespace UnitTestProject1
{
public sealed class JavaScriptTestHelper : IDisposable
{
    private ScriptControl _scriptControl;
    private TestContext _testContext;

    public JavaScriptTestHelper(TestContext testContext)
    {
        _testContext = testContext;
        _scriptControl = new ScriptControl()
        {
            Language = "JScript",
            AllowUI = false
        };
        LoadShim();
    }

    public void LoadFile(string path)
    {
        _scriptControl.AddCode(File.ReadAllText(path));
    }

    public void ExecuteTest(string testMethodName)
    {
        dynamic result = null;
        try
        {
            result = _scriptControl.Run(testMethodName, new object[] { });
        }
        catch
        {
            RaiseTestError();
        }
    }

    public void Dispose()
    {
        _scriptControl = null;
    }

    private void RaiseTestError()
    {
        var error = ((IScriptControl)_scriptControl).Error;
        if (error != null && _testContext != null)
        {
            _testContext.WriteLine(String.Format("{0} Line: {1} Column: {2}",
                error.Source, error.Line, error.Column));
        }
        throw new AssertFailedException(error.Description);
    }

    private void LoadShim()
    {
        _scriptControl.AddCode(@"
            var isMsScriptEngineContext = true; 
            var window = window || {}; 
            var document = document || {};");
    }
}
}
