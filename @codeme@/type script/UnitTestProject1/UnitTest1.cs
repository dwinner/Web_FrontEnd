using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestProject1
{
[TestClass]
public class TypeScriptTests
{
    private TestContext _context;

    public TestContext TestContext
    {
        get { return this._context; }
        set { this._context = value; }
    }

    [TestMethod]
    public void RunTypeScriptTests()
    {
        var runner = new JavaScriptTestHelper(_context);

        // Load JavaScript files
        runner.LoadFile("ReferenceScripts\\Calculations.js");
        runner.LoadFile("ReferenceScripts\\tsUnit.js");
        runner.LoadFile("ReferenceScripts\\CalculationsTests.js");

        // Execute JavaScript Test
        runner.ExecuteTest("getResult");
    }
}
}
