namespace Net7Tests
{
    public class EnumTests
    {

        private enum Colors
        {
            Red,
            Green,
            Orange,
            Yellow,
            Blue,
            Purple
        }


        [Fact]
        public void Convert()
        {
            var color = Colors.Red;

            var colorString = color.ToString();

            Console.WriteLine(color);

            Assert.Equal("Red", colorString);
        }

    }
}
