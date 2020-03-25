<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">

    <xsl:script><![CDATA[
var Category;

function setCategory(s)
{
    Category = s != 0 ? "Primary" : "Secondary";
}

]]></xsl:script>
    <xsl:template match="/">
        <DIV>
        <xsl:attribute name="class"><xsl:value-of select="SECTION/HEAD/CLASS"/>_sec</xsl:attribute>
        <xsl:apply-templates/>
        </DIV>
    </xsl:template>

    <xsl:template match="SECTION">
        <xsl:eval>setCategory(this.attributes.getNamedItem("PRIMARY").text)</xsl:eval>

        <!-- Starting places is so cool that it gets wrapped in a table  -->
        <xsl:choose>
            <xsl:when test=".[@STYLE='startpl']">
                <TABLE HEIGHT="100%">
                    <xsl:apply-templates/>
                </TABLE>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="HEAD">
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="HEAD/TITLE[@VISIBLE='1']">
        <DIV>
            <xsl:attribute name="class">header<xsl:eval>Category</xsl:eval></xsl:attribute>
        <xsl:value-of/>
        </DIV>
    </xsl:template>

    <!-- special header style just for Starting Places -->
    <xsl:template match="/SECTION[@STYLE='startpl']/HEAD/TITLE[@VISIBLE='1']">
        <TR><TD COLSPAN="3">
            <DIV CLASS="startingplaces">
                <xsl:value-of/>
            </DIV>
        </TD></TR>
    </xsl:template>

    <xsl:template match="IMAGES">
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="IMAGE">
        <img>
            <xsl:attribute name="SRC"><xsl:value-of select="IMGSRC"/></xsl:attribute>
            <xsl:attribute name="HEIGHT"><xsl:value-of select="HEIGHT"/></xsl:attribute>
            <xsl:attribute name="WIDTH"><xsl:value-of select="WIDTH"/></xsl:attribute>
        </img>

        <xsl:if test=".[@BREAK='1']">
            <BR/>
        </xsl:if>
    </xsl:template>

    <xsl:template match="ITEMS">
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="ITEM[@VISIBLE='1']">
        <xsl:apply-templates/>
    </xsl:template>

    <!-- Starting places is so cool that it gets a special template
         because it wants to put the goofy icon at the left hand side -->

    <xsl:template match="/SECTION[@STYLE='startpl']/ITEMS/ITEM[@VISIBLE='1']">
        <TR><TD VALIGN="top" STYLE="padding-right: 28px">
        <xsl:if test="ICON">
            <A onclick="javascript:shellExecEvent()" HREF=":">
                <xsl:attribute name="HREFEX"><xsl:value-of select="HREF"/></xsl:attribute>
                <xsl:attribute name="TITLE"><xsl:value-of select="TITLE"/></xsl:attribute>
                <IMG HEIGHT="32" WIDTH="32" BORDER="0">
                    <xsl:attribute name="src"><xsl:value-of select="ICON"/></xsl:attribute>
                </IMG>
            </A>
        </xsl:if>
        </TD>
        <TD VALIGN="top">
        <DIV>
        <A onclick="javascript:shellExecEvent()" HREF=":">
            <xsl:attribute name="class">text<xsl:eval>Category</xsl:eval></xsl:attribute>
            <xsl:attribute name="HREFEX"><xsl:value-of select="HREF"/></xsl:attribute>
            <xsl:attribute name="TITLE"><xsl:value-of select="TITLE"/></xsl:attribute>
            <xsl:value-of select="TEXT"/>
        </A>
        </DIV>
        <DIV CLASS="taskAssociation">
        <A onclick="javascript:shellExecEvent()" HREF=":">
            <xsl:attribute name="HREFEX"><xsl:value-of select="HREF"/></xsl:attribute>
            <xsl:attribute name="TITLE"><xsl:value-of select="TITLE"/></xsl:attribute>
            <xsl:value-of select="SUBTEXT"/>
        </A>
        </DIV>
        </TD>
        <TD WIDTH="42"></TD>
        </TR>
    </xsl:template>

    <!-- My Programs is so cool that it gets a special template
         because it wants the <OBJECT CLASSID> element -->

    <xsl:template match="/SECTION[@STYLE='myprograms']/ITEMS">
        <xsl:apply-templates/>
        <xsl:if test="..[@MORETARGET]">
            <DIV CLASS="textSecondary" STYLE="margin-left: 18px">
            <A TARGET="_blank">
                <xsl:attribute name="HREF"><xsl:value-of select="../@MORETARGET"/></xsl:attribute>
                <xsl:value-of select="/SECTION/LOC[@NAME='more']"/>
            </A></DIV>
        </xsl:if>
    </xsl:template>

    <xsl:template match="/SECTION[@STYLE='myprograms']/ITEMS/ITEM[@VISIBLE='1']">
        <DIV style="margin: 4px 0px 4px 0px;">
            <xsl:attribute name="class">text<xsl:eval>Category</xsl:eval></xsl:attribute>
        <A href="javascript:">
        <OBJECT CLASSID="CLSID:844F4806-E8A8-11d2-9652-00C04FC30871">
            <PARAM name="path">
                <xsl:attribute name="value"><xsl:value-of select="HREF"/></xsl:attribute>
            </PARAM>
            <PARAM NAME="view" VALUE="Small Icon with Label"/>
            <PARAM NAME="clickStyle" VALUE="1"/>
            <PARAM NAME="labelGap" VALUE="4"/>
        </OBJECT>
        </A>
        <xsl:if test=".[@NEW='1']">
            <SPAN CLASS="new"><xsl:value-of select="/SECTION/LOC[@NAME='new']"/></SPAN>
        </xsl:if>
        </DIV>
    </xsl:template>

    <xsl:template match="/SECTION[@PRIMARY='0']//ITEM[@LINKSTYLE='shellexec']/TEXT">
        <SPAN>
            <xsl:attribute name="class">text<xsl:eval>Category</xsl:eval></xsl:attribute>
        </SPAN>
        <xsl:if test="..[@NEW='1']">
            <SPAN CLASS="new"><xsl:value-of select="/SECTION/LOC[@NAME='new']"/></SPAN>
        </xsl:if>
        <BR/>
    </xsl:template>

    <xsl:template match="ITEM[@LINKSTYLE='url']/TEXT">
        <SPAN>
            <xsl:attribute name="class">text<xsl:eval>Category</xsl:eval></xsl:attribute>
        <A TARGET="_blank">
            <xsl:attribute name="HREF"><xsl:value-of select="../HREF"/></xsl:attribute>
            <xsl:attribute name="TITLE"><xsl:value-of select="../TITLE"/></xsl:attribute>
            <xsl:value-of/>
        </A>
        </SPAN>
        <BR/>
    </xsl:template>

    <xsl:template match="ITEM/NOTES">
        <SPAN CLASS="notifications">
            <xsl:value-of/>
        </SPAN>
        <BR/>
    </xsl:template>

</xsl:stylesheet>
