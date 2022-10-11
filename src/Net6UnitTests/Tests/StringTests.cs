namespace Tests
{
    public class StringTests
    {
        [Theory]
        [InlineData("123", "123")]
        [InlineData("123a", "123")]
        public void Test1(string input, string expectedOutput)
        {
            var output = input.Where(c => char.IsDigit(c)) ?? String.Empty;

            Assert.Equal(output, expectedOutput);
        }
    }
}