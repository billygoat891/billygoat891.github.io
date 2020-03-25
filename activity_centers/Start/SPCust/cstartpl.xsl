<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">

    <xsl:template match="/">
        <DIV class="section">

            <!-- Title for this section -->

            <P class="sectitle">
            <xsl:value-of select="STARTPLACE/TITLE"/>
            </P>

            <!-- Heading for this section -->
            <xsl:if test="CUSTOMIZEHELP">
                <P class="sechead">
                <xsl:value-of select="STARTPLACE/CUSTOMIZEHELP"/>
                </P>
            </xsl:if>

            <INPUT class="checkbox" type="checkbox" name="checkboxNN" value="checkbox">
            <xsl:if test="STARTPLACE[@SHOW]">
                <xsl:attribute name="checked"/>
            </xsl:if>
            </INPUT>

            <xsl:value-of select="STARTPLACE/SHOWTEXT"/>
            <HR/>

            <TABLE class="item" BORDER="0" WIDTH="100%">
            <xsl:for-each select="STARTPLACE/ACTIVITY">
                <TR><TD>
                <INPUT class="checkbox" type="checkbox" name="checkboxNN" value="checkbox">
                <xsl:if test=".[@SHOW]">
                    <xsl:attribute name="checked"/>
                </xsl:if>
                </INPUT>
                </TD><TD COLSPAN="2" _BUGBUG_="zzi">
                <xsl:choose>
                    <xsl:when test="EDITDESCRIPTION">
                        <INPUT class="text" type="text" name="textfieldNN" maxlength="50" size="30">
                        <xsl:attribute name="value">
                            <xsl:value-of select="ACTIVITY_DESCRIPTION"/>
                        </xsl:attribute>
                        </INPUT>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="ACTIVITY_DESCRIPTION"/>
                    </xsl:otherwise>
                </xsl:choose>
                </TD></TR>
                <TR><TD></TD><TD>
                <xsl:value-of select="../LOC/WITH"/>
                &quot;<xsl:value-of select="APPLICATION_NAME"/>&quot;
                </TD><TD ALIGN="RIGHT">
                <A HREF="">change</A>
                </TD></TR>
            </xsl:for-each>
            </TABLE>
        </DIV>
    </xsl:template>

</xsl:stylesheet>
