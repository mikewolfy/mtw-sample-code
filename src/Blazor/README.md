# Blazor Notes

## Error Running Locally

First, when I fire up my app locally I get `ERR_HTTP2_INADEQUATE_TRANSPORT_SECURITY`.  To fix it, I tried following the instuctions laid out in this post by Scott Hanselman.  

[https://www.hanselman.com/blog/DevelopingLocallyWithASPNETCoreUnderHTTPSSSLAndSelfSignedCerts.aspx](https://www.hanselman.com/blog/DevelopingLocallyWithASPNETCoreUnderHTTPSSSLAndSelfSignedCerts.aspx])

In short, he explains that you can run the following commands:

- `dotnet dev-certs https --clean`
- `dotnet dev-certs https --trust`

However, I realized that the error is only with Chrome so I set my browser to Edge.