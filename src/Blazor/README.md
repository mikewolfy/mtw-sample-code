# Blazor Notes

## Error Running Locally

First, when I fire up my app locally I get `ERR_HTTP2_INADEQUATE_TRANSPORT_SECURITY`.  To fix it, I followed the instuctions laid out in this post by Scott Hanselman.  In short, I just needed to run `dotnet dev-certs https --trust`.

[https://www.hanselman.com/blog/DevelopingLocallyWithASPNETCoreUnderHTTPSSSLAndSelfSignedCerts.aspx](https://www.hanselman.com/blog/DevelopingLocallyWithASPNETCoreUnderHTTPSSSLAndSelfSignedCerts.aspx])