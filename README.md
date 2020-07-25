# speedify

This is the source code for the Speedify firefox extension.

So far, the extension only supports YouTube but I pretend on adapting it to fit other website's video players.<br>
Just know that, when a website uses the Vimeo video player, it's not possible to use the same technique I used to make the YouTube version because the video is played on an `<iframe>` element, and accessing contents from an `<iframe>` which source is on another domain is something browsers don't allow ([Cross Site Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting)). Note that the extension uses [jQuery 3.5.1 slim version](https://code.jquery.com/jquery-3.5.1.slim.min.js).

Feel free to open [issues](https://github.com/bored-user/speedify/issues) and [pull requests](https://github.com/bored-user/speedify/pulls). All help is welcome.
