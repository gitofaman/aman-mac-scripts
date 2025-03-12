$(document).ready(function() {
    $(document).on('click', '.add-sibling-input-btn', function() {
        let toDuplicateValue = $(this).attr('duplicate-input');
        let $original = $('[duplicate-this="' + toDuplicateValue + '"]').first();
        
        if ($original.length) {
            let $container = $original.parent();
            let currentCount = $container.find('[duplicate-this="' + toDuplicateValue + '"]').length;
            
            let $clone = $original.clone();
            
            $clone.find('[name]').each(function() {
                let baseName = $(this).attr('name').replace(/-\d+$/, '');
                $(this).attr('name', baseName + '-' + (currentCount + 1));
            });
            
            $clone.find('[id]').each(function() {
                let baseId = $(this).attr('id').replace(/-\d+$/, '');
                $(this).attr('id', baseId + '-' + (currentCount + 1));
            });
            
            $container.append($clone);
        }
    });
    
    $(document).on('click', '[delete-this]', function() {
        let $duplicateBlock = $(this).closest('[duplicate-this]');
        let $container = $duplicateBlock.parent();
        
        $duplicateBlock.remove();
        
        // Recalculate name and id indexes after deletion
        $container.find('[duplicate-this]').each(function(index) {
            $(this).find('[name]').each(function() {
                let baseName = $(this).attr('name').replace(/-\d+$/, '');
                $(this).attr('name', baseName + '-' + (index + 1));
            });
            
            $(this).find('[id]').each(function() {
                let baseId = $(this).attr('id').replace(/-\d+$/, '');
                $(this).attr('id', baseId + '-' + (index + 1));
            });
        });
    });
});