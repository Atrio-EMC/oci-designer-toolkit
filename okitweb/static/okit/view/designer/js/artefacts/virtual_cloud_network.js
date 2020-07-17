/*
** Copyright (c) 2020, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
console.info('Loaded Designer VirtualCloudNetwork View Javascript');

/*
** Define VirtualCloudNetwork View Artifact Class
 */
class VirtualCloudNetworkView extends OkitContainerDesignerArtefactView {
    constructor(artefact=null, json_view) {
        super(artefact, json_view);
        console.group('Check if default Security List & Route Table Should be created.');
        if (okitSettings.is_default_route_table) {
            console.info('Creating Default Route Table');
            let route_table = json_view.newRouteTable(json_view.getOkitJson().newRouteTable({vcn_id: this.id, compartment_id: this.compartment_id}));
        }
        if (okitSettings.is_default_security_list) {
            console.info('Creating Default Security List');
            let security_list = json_view.newSecurityList(json_view.getOkitJson().newSecurityList({vcn_id: this.id, compartment_id: this.compartment_id}));
            security_list.artefact.addDefaultSecurityListRules(this.artefact.cidr_block);
        }
        console.groupEnd();
    }

    get parent_id() {return this.artefact.compartment_id;}
    get minimum_width() {return 400;}
    get minimum_height() {return 300;}

    getParent() {
        return this.getJsonView().getCompartment(this.parent_id);
    }

    getParentId() {
        return this.parent_id;
    }

    /*
     ** SVG Processing
     */
    getSvgDefinition() {
        console.group('Getting Definition of ' + this.getArtifactReference() + ' : ' + this.id);
        let definition = this.newSVGDefinition(this, VirtualCloudNetwork.getArtifactReference());
        //let parent_first_child = getCompartmentFirstChildContainerOffset(this.compartment_id);
        let parent_first_child = this.getParent().getChildOffset(this.getArtifactReference());
        definition['svg']['x'] = parent_first_child.dx;
        definition['svg']['y'] = parent_first_child.dy;
        definition['svg']['width'] = this.dimensions['width'];
        definition['svg']['height'] = this.dimensions['height'];
        definition['rect']['stroke']['colour'] = stroke_colours.orange;
        definition['rect']['stroke']['dash'] = 5;
        definition['rect']['stroke']['width'] = 2;
        definition['icon']['x_translation'] = icon_translate_x_start;
        definition['icon']['y_translation'] = icon_translate_y_start;
        definition['name']['show'] = true;
        definition['label']['show'] = true;
        definition['info']['show'] = true;
        definition['info']['text'] = this.cidr_block;
        console.info(JSON.stringify(definition, null, 2));
        console.groupEnd();
        return definition;
    }

    /*
    ** Property Sheet Load function
     */
    loadProperties() {
        let me = this;
        $(jqId(PROPERTIES_PANEL)).load("propertysheets/virtual_cloud_network.html", () => {
            loadPropertiesSheet(me.artefact);
            $(jqId('cidr_block')).on('change', function() {
                console.info('CIDR Block Changed ' + $(jqId('cidr_block')).val());
                for (let subnet of me.artefact.getOkitJson().subnets) {
                    if (subnet.vcn_id === me.id) {
                        subnet.cidr_block = subnet.generateCIDR(me.id);
                    }
                }
                redrawSVGCanvas();
            });
        });
    }

    /*
    ** Load and display Value Proposition
     */
    loadValueProposition() {
        $(jqId(VALUE_PROPOSITION_PANEL)).load("valueproposition/virtual_cloud_network.html");
    }

    /*
    ** Child Artifact Functions
     */
    getTopEdgeArtifacts() {
        return [InternetGateway.getArtifactReference(), NATGateway.getArtifactReference()];
    }

    getTopArtifacts() {
        return [RouteTable.getArtifactReference(), SecurityList.getArtifactReference(), NetworkSecurityGroup.getArtifactReference()];
    }

    getContainerArtifacts() {
        return [Subnet.getArtifactReference()];
    }

    getRightEdgeArtifacts() {
        return[ServiceGateway.getArtifactReference(), DynamicRoutingGateway.getArtifactReference(), LocalPeeringGateway.getArtifactReference()]
    }

    getBottomEdgeArtifacts() {
        return [];
    }

    /*
    ** Static Functionality
     */
    static getArtifactReference() {
        return VirtualCloudNetwork.getArtifactReference();
    }

    static getDropTargets() {
        return [Compartment.getArtifactReference()];
    }

}