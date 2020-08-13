import DataTable from '/base/js/Data/DataTable.js';
import GroupDataModifier from '/base/js/Data/Modifiers/GroupDataModifier.js';

QUnit.test('RangeDataModifier.execute', function (assert) {

    const tableJSON = {
            $class: 'DataTable',
            rows: [{
                $class: 'DataTableRow',
                x: 0,
                y: 'a'
            }, {
                $class: 'DataTableRow',
                x: 0,
                y: 'b'
            }, {
                $class: 'DataTableRow',
                x: 1,
                y: 'b'
            }, {
                $class: 'DataTableRow',
                x: 1,
                y: 'a'
            }]
        },
        table = DataTable.fromJSON(tableJSON),
        modifier = new GroupDataModifier({
            groupColumn: 'y'
        }),
        modifiedTable = modifier.execute(table);

    assert.ok(
        modifiedTable !== table &&
        modifiedTable.getRow(0).getColumn('table') instanceof DataTable,
        'Filtered table should contain subtables.'
    );

    assert.deepEqual(
        modifiedTable.toJSON(),
        {
            "$class": "DataTable",
            "rows": [{
                "$class": "DataTableRow",
                "id": "0",
                "table": {
                    "$class": "DataTable",
                    "rows": [{
                        $class: 'DataTableRow',
                        x: 0,
                        y: 'a'
                    }, {
                        $class: 'DataTableRow',
                        x: 1,
                        y: 'a'
                    }]
                },
                "value": "a"
            }, {
                "$class": "DataTableRow",
                "id": "1",
                "table": {
                    "$class": "DataTable",
                    "rows": [{
                        $class: 'DataTableRow',
                        x: 0,
                        y: 'b'
                    }, {
                        $class: 'DataTableRow',
                        x: 1,
                        y: 'b'
                    }]
                },
                "value": "b"
            }]
        },
        'JSON of filtered table should have two subtables.'
    );

});