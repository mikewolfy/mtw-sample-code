using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public class Lambdas
    {
        [Fact]
        private void TestFunct()
        {
            var msg = "Welcome to Lambda Improvements";
            Func<string> welcome = () => "Welcome to Lambda Improvements";
            Assert.Equal(msg, welcome.Invoke());
        }

        [Fact]
        private void TestFunct2()
        {
            var msg = "one";
            Func<string, string> doubleIt = (s) => $"{s}{s}";
            Assert.Equal($"{msg}{msg}", doubleIt.Invoke(msg));
        }
    }
}
