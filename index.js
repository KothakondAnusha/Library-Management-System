var bookData;
var originalBookData;
function fetchData()
{
        fetch('books.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data){
            this.bookData=data;
            this.originalBookData=data;
            tableBody.innerHTML="";
            addBody(0,10);
        })
        .catch(function (err) {
            console.log(err);
        });
}
fetchData();


var filter="title";
function filterChange()
{
    var selFilter=document.getElementById('filter');
    document.getElementById("search").placeholder="Search by "+selFilter.options[selFilter.selectedIndex].text;
    this.filter=selFilter.value;
    fetchData();
    document.getElementById("count").innerHTML="";
    document.getElementById("search").value="";
    document.getElementById("load").innerHTML="Load More";

}


function addBody(curr,n)
{
    let tableBody = document.getElementById('tableBody');
    for(var i=curr;i<n;i++)
    {
        let uiString = `<tr>
                            <td>${i+1}</td>
                            <td>${bookData[i].title}</td>
                            <td>${bookData[i].author}</td>
                            <td>${bookData[i].published}</td>
                            <td>${bookData[i].subject}</td>

                        </tr>`;
        tableBody.innerHTML += uiString;
    }

}

curr=10
function loadMore()
{
    let n=this.bookData.length>curr+10?curr+10:bookData.length;
    addBody(curr,n);
    console.log(n)
    this.curr+=10;
    if(curr>=this.bookData.length)
    {
        document.getElementById("load").innerHTML="";
    }
}


function searchBook()
{
    console.log(filter)
    let key=document.getElementById("search").value;
    var filteredBookData = originalBookData.filter(function(el){
        return el[filter].toLowerCase().includes(key.toLowerCase());
    });
    tableBody.innerHTML="";
    this.bookData=filteredBookData;
    if(filteredBookData.length==0)
    {
        tableBody.align="center";
        tableBody.innerHTML=" <br><center> <tr > <td colspan='5'> No Books Found !!</td></tr> </p> </center>";
    }
    if(curr>this.bookData.length)
    {
        document.getElementById("load").innerHTML="";
    }

    let n=filteredBookData.length>10?10:filteredBookData.length;
    addBody(0,n);
    document.getElementById("count").innerHTML="---- " +filteredBookData.length + " results found ----";
}