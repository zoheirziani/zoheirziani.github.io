<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
    <xsl:template match="/">
        <html>
            <head>
                <meta charset="utf-8" />
                <title>zoheirziani.github.io HTML Site Map</title>
                <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
                <style>
                    * {box-sizing: border-box;}
                    body {background-color: #e8e8e8; font-family: Roboto, Helvetica, "Arial", sans-serif; max-width: 1000px; width: 100%; margin: 0 auto;}
                    header {background-color: #99bdf6; color: #313335; padding: 40px;}
                    h1 {margin: 0; font-size: 24px; padding: 8px 5px; text-align: center; background-color: #eee; border-radius: 8px; box-shadow: 0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2); }
                    div {margin-top: 20px; font-size: 18px; display: flex; justify-content: space-between; }
                    @media all and (max-width:480px) {
                        div {flex-direction: column;}
                        div span {padding: 5px 0}
                    }
                    main {
                        overflow: scroll;
                        border-radius: 8px;
                        width: 90%;
                        max-width: 600px;
                        margin: -20px auto 20px auto;
                        padding: 10px;
                        background-color: #eee;
                        color: #1B66C9;
                        box-shadow: 0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
                    }
                    ul {margin: 0;padding: 0; min-width: max-content; width: 100%; list-style: none;}
                    li {border-bottom: #ddd 1px solid;padding: 10px 5px;margin: 5px auto; }
                    li:first-of-type {background-color: #ddd;}
                    li:hover {background-color: #ddd;}
                    a, a:visited {color:inherit;}
                    footer {text-align: center;}
                </style>
            </head>
            <body>
                <header>
                    <h1>zoheirziani.github.io Site Map</h1>
                    <div> 
                        <span>Total pages:  <xsl:value-of select="count(s:urlset/s:url)"/></span>
                        <span>Last updated: <xsl:value-of select="s:urlset/s:url/s:lastmod"/></span>
                    </div>
                </header>
                <main>
                    <ul>
                        <xsl:for-each select="s:urlset/s:url">
                            <li>
                                <a href="{s:loc}" title="{s:loc}">
                                    <xsl:value-of select="s:loc"/>
                                </a>
                            </li>
                        </xsl:for-each>
                    </ul>                
                </main>
                <footer>
                    Copyright &#169; <strong>Zoheir Ziani</strong>
                </footer>                
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>