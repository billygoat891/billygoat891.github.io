
ItemList.prototype.Add = ItemList_Add;
ItemList.prototype.Remove = ItemList_Remove;
ItemList.prototype.RemoveAll = ItemList_RemoveAll;
ItemList.prototype.IsEmpty = ItemList_IsEmpty;
ItemList.prototype.Count = ItemList_Count;
ItemList.prototype.Item = ItemList_Item;

function ItemList()
{
    this._cItems = 0;
    this._aItems = new Array();
}

function ItemList_Add(item)
{
    this._aItems[this._cItems] = item;
    this._cItems++;
}

function ItemList_Remove(index)
{
    if (index >= 0 && index < this._cItems)
    {
         for (i=index-0; i < this._cItems-1; i++)
             this._aItems[i] = this._aItems[i+1];
         this._aItems[this._cItems-1] = null;
         this._cItems--;
    }
}

function ItemList_RemoveAll()
{
    this._cItems = 0;
    this._aItems = new Array();
}

function ItemList_IsEmpty()
{
    return  (this._cItems == 0);
}

function ItemList_Count()
{
    return this._cItems;
}

function ItemList_Item(index)
{
    if (index >= 0 && index < this._cItems)
    {
        return this._aItems[index];
    }
    return null;
}
    


