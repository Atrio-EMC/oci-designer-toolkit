/*
** Copyright (c) 2020, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
console.info('Loaded FastConnect Javascript');

const fast_connect_query_cb = "fast-connect-query-cb";

/*
** Define FastConnect Class
 */
class FastConnect extends OkitArtifact {
    /*
    ** Create
     */
    constructor (data={}, okitjson={}) {
        super(okitjson);
        // Configure default values
        this.display_name = this.generateDefaultName(okitjson.fast_connects.length + 1);
        this.compartment_id = data.parent_id;
        // Update with any passed data
        this.merge(data);
        this.convert();
    }


    /*
    ** Clone Functionality
     */
    clone() {
        return new FastConnect(this, this.getOkitJson());
    }


    /*
    ** Delete Processing
     */
    deleteChildren() {}


    getNamePrefix() {
        return super.getNamePrefix() + 'fc';
    }

    /*
    ** Static Functionality
     */
    static getArtifactReference() {
        return 'Fast Connect';
    }

}

$(document).ready(function() {
    // Setup Search Checkbox
    let body = d3.select('#query-progress-tbody');
    let row = body.append('tr');
    let cell = row.append('td');
    cell.append('input')
        .attr('type', 'checkbox')
        .attr('id', fast_connect_query_cb);
    cell.append('label').text(FastConnect.getArtifactReference());

    // Setup Query Display Form
    body = d3.select('#query-oci-tbody');
    row = body.append('tr');
    cell = row.append('td')
        .text(FastConnect.getArtifactReference());
    cell = row.append('td');
    let input = cell.append('input')
        .attr('type', 'text')
        .attr('class', 'query-filter')
        .attr('id', 'fast_connect_name_filter')
        .attr('name', 'fast_connect_name_filter');
});
