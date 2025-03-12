// SCRIPT TO REMOVE BINDINGS FROM WEBFLOW
var selectorsOfCollectionList = '[COLLECTION-ATTRIBUTE]'
var webflowAttrs = ["data-wf-collection", 'data-wf-sku-bindings', "data-wf-template-id"]
webflowAttrs.forEach(function(webflowAttr) {
    $(selectorsOfCollectionList).find(`[${webflowAttr}]`).each(function() {
        $(this).removeAttr(webflowAttr)
    })
})