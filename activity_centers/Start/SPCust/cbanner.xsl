<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">

    <xsl:template match="/">
        <DIV class="section">

            <!-- Title for this section -->
            <xsl:if test="SECTION/HEAD/TITLE">
                <P class="sectitle">
                <xsl:value-of select="SECTION/HEAD/TITLE"/>
                </P>
            </xsl:if>

            <!-- Heading for this section -->
            <xsl:if test="SECTION/HEAD/CUSTTEXT">
                <P class="sechead">
                <xsl:value-of select="SECTION/HEAD/CUSTTEXT"/>
                </P>
            </xsl:if>


            <INPUT type="checkbox" name="checkboxNN" value="checkbox">
            <xsl:if test="SECTION[@VISIBLE='1']">
                <xsl:attribute name="checked"/>
            </xsl:if>
            </INPUT>

            <xsl:value-of select="SECTION/HEAD/SHOWTEXT"/>

            <xsl:if test="SECTION[@SELECTIVE='1']">
                <HR/>

                <TABLE class="item" BORDER="0" WIDTH="100%">
                <xsl:for-each select="SECTION/ITEMS/ITEM">
                    <TR><TD>
                    <INPUT class="checkbox" type="checkbox" name="checkboxNN" value="checkbox">
                    <xsl:if test=".[@VISIBLE='1']">
                        <xsl:attribute name="checked"/>
                    </xsl:if>
                    </INPUT>
                    </TD>
                    <TD COLSPAN="2">
                    <xsl:choose>
                        <xsl:when test="TEXT[@CANEDIT='1']">
                            <INPUT class="text" type="text" name="textfieldNN" maxlength="50" size="30">
                            <xsl:attribute name="value">
                                <xsl:value-of select="TEXT"/>
                            </xsl:attribute>
                            </INPUT>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="TEXT"/>
                        </xsl:otherwise>
                    </xsl:choose>
                    </TD></TR>
                    <TR><TD></TD><TD WIDTH="100%">
                    <xsl:if test="APPNAME">
                        <xsl:value-of select="/SECTION/LOC[@NAME='with']"/>
                        &quot;<xsl:value-of select="APPNAME"/>&quot;
                    </xsl:if>
                    </TD><TD>
                    <A HREF="javascript:" onclick="this.containingBehavior.changeApplication(this)">
                    <xsl:value-of select="/SECTION/LOC[@NAME='change']"/>
                    </A>
                    </TD></TR>
                </xsl:for-each>
                </TABLE>
            </xsl:if>

        </DIV>
    </xsl:template>

</xsl:stylesheet>
