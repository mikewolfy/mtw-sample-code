using Xunit.Sdk;

namespace Net7Tests
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            Assert.True(true);
        }

        [Fact]
        public void SuppressNullability()
        {
            TestClass? testClass = null;
            TestClass nonNullable = testClass!;
        }

        private class TestClass
        {
            public string Value { get; set; } = string.Empty;
        }
    }
}