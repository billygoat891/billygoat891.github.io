<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">

    <xsl:template match="/">
        <DIV class="section">

            <!-- Title for this section -->

            <P class="sectitle">
            <xsl:value-of select="MYPROGRAMS/TITLE"/>
            </P>

            <!-- Heading for this section -->
            <xsl:if test="MYPROGRAMS/CUSTTEXT">
                <P class="sechead">
                <xsl:value-of select="MYPROGRAMS/CUSTTEXT"/>
                </P>
            </xsl:if>

            <TABLE class="item" BORDER="0" WIDTH="100%">
            <TR><TD VALIGN="top">
                <INPUT type="checkbox" value="checkbox">
                <xsl:attribute name="name">
                    myprog<xsl:eval>formatIndex(uniqueID(this), "1")</xsl:eval>
                </xsl:attribute>

                <xsl:if test="MYPROGRAMS[@SHOW='1']">
                    <xsl:attribute name="checked"/>
                </xsl:if>
                </INPUT>
            </TD><TD VALIGN="top">
                <xsl:value-of select="MYPROGRAMS/SHOWTEXT"/>
            </TD></TR>

            <TR><TD COLSPAN="2">
            <HR/>
            </TD></TR>

            <xsl:for-each select="MYPROGRAMS/PROGRAM">
                <TR><TD VALIGN="top">

                <INPUT type="checkbox" value="checkbox">
                <xsl:attribute name="name">
                    myprog<xsl:eval>formatIndex(uniqueID(this), "1")</xsl:eval>
                </xsl:attribute>
                <xsl:if test=".[@SHOW='1']">
                    <xsl:attribute name="checked"/>
                </xsl:if>
                </INPUT>
                </TD><TD VALIGN="top">
                <xsl:value-of select="DISPLAY_NAME"/>
                </TD></TR>
                <!-- bug somewhere: if you delete the word "BUG"
                     then the table comes out empty! -->
                <TR><TD></TD><TD VALIGN="bottom" ALIGN="right">
                <A HREF="">change</A>
                </TD></TR>
            </xsl:for-each>
            </TABLE>
        </DIV>
    </xsl:template>

</xsl:stylesheet>
