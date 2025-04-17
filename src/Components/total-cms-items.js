function countTotalItems({ listSelector, itemSelector, nextPageSelector, totalCountSelector }) {
    let totalItems = $(listSelector).find(itemSelector).length; // Count initial items

    function fetchNextPage(nextPageUrl) {
        if (!nextPageUrl) {
            console.log(`Final Total (${itemSelector}):`, totalItems);
            $(totalCountSelector).html(totalItems); // Update count in DOM
            return;
        }

        console.log("Fetching:", nextPageUrl);

        $.ajax({
            url: nextPageUrl,
            method: "GET",
            success: function (response) {
                let tempDiv = $("<div>").html(response);
                let newItems = tempDiv.find(itemSelector).length;
                totalItems += newItems;

                console.log(`Fetched ${newItems} more. Total so far: ${totalItems}`);

                let nextPageElement = tempDiv.find(nextPageSelector);
                let nextPageLink = nextPageElement.length ? nextPageElement.attr("href") : null;

                fetchNextPage(nextPageLink); // Recursively fetch next page
            },
            error: function () {
                console.error("Error fetching:", nextPageUrl);
            }
        });
    }

    // Start fetching if a next-page link exists
    let nextPageElement = $(listSelector).find(nextPageSelector);
    if (nextPageElement.length) {
        let nextPageUrl = nextPageElement.attr("href");
        fetchNextPage(nextPageUrl);
    } else {
        console.log(`No next page. Total ${itemSelector}:`, totalItems);
        $(totalCountSelector).html(totalItems);
    }
}


// this is how it works
// countTotalItems({
//     listSelector: ".blogs-lists",
//     itemSelector: ".blog-item",
//     nextPageSelector: ".w-pagination-next",
//     totalCountSelector: "[aria-total-blogs]"
// });

