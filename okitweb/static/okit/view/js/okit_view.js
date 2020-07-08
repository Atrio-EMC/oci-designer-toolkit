/*
** Copyright (c) 2020, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
console.info('Loaded OKIT View Javascript');

// TODO: Implement View Classes
class OkitJsonView {
    constructor(okitjson=null) {
        // Specify / Assign Model
        if (okitjson === null || okitjson === undefined) {
            this.okitjson = new OkitJson();
        } else if (typeof okitjson === 'string') {
            this.okitjson = JSON.parse(okitjson);
        } else if (okitjson instanceof Object) {
            this.okitjson = okitjson;
        } else {
            this.okitjson = new OkitJson();
        }
        // Define View Lists
        // Load Model to View
        this.parent_map = {};
        this.load();
    }

    get small_grid_size() {return 8;}
    get grid_size() {return this.small_grid_size * 10;}
    get stroke_colours() {
        return {
            red: "#F80000",
            bark: "#312D2A",
            gray: "#5f5f5f",
            blue: "#0066cc",
            orange: "#ff6600",
            purple: "#400080",
            icon_colour_01: "#F80000",
            icon_colour_02: "#5f5f5f",
            icon_colour_03: "#ff6600",
        };
    }
    get svg_highlight_colour() {return "#00cc00";}

    drop(source, target) {
        let newFunction = 'new' + source.name;
        let getFunction = 'get' + target.type.split(' ').join('');
        console.info('New Function : ' + newFunction);
        console.info('Get Function : ' + getFunction);
    }

    load() {}

    draw() {}

    getOkitJson() {
        return this.okitjson;
    }

    /*
    ** Common View Functions
     */
    addGrid(canvas_svg) {
        canvas_svg.append('rect')
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "url(#grid)");
    }

    /*
    ** Artefact Processing
     */

    // Autonomous Database
    newAutonomousDatabase() {
        return new AutonomousDatabaseView(this.okitjson.newAutonomousDatabase(), this);
    }
    getAutonomousDatabase() {}
    deleteAutonomousDatabase() {}

    // Block Storage
    newBlockStorageVolume() {
        return new BlockStorageVolumeView(this.okitjson.newBlockStorageVolume(), this);
    }
    getBlockStorageVolume() {}
    deleteBlockStorageVolume() {}

    // Compartment
    dropCompartment(target) {
        let getFunction = 'get' + target.type.split(' ').join('');
        let target_model_artefact = this.okitjson[getFunction](target.id);
        let view_artefact = this.newCompartment();
        view_artefact.compartment_id = target.type === Compartment.getArtifactReference() ? target.id : target.compartment_id;
        return view_artefact;
    }
    newCompartment(compartment) {
        console.info('New Compartment View');
        return compartment ? new CompartmentView(new Compartment(compartment, this.okitjson), this) : new CompartmentView(this.okitjson.newCompartment(), this);
    }
    getCompartment() {}
    deleteCompartment() {}

    // Container
    newContainer() {}
    getContainer() {}
    deleteContainer() {}

    // Database System
    newDatabaseSystem() {
        return new DatabaseSystemView(this.okitjson.newDatabaseSystem(), this);
    }
    getDatabaseSystem() {}
    deleteDatabaseSystem() {}

    // Dynamic Routing Gateway
    newDynamicRoutingGateway() {
        return new DynamicRoutingGatewayView(this.okitjson.newDynamicRoutingGateway(), this);
    }
    getDynamicRoutingGateway() {}
    deleteDynamicRoutingGateway() {}

    // Fast Connect
    newFastConnect() {
        return new FastConnectView(this.okitjson.newFastConnect(), this);
    }
    getFastConnect() {}
    deleteFastConnect() {}

    // File Storage System
    newFileStorageSystem() {
        return new FileStorageSystemView(this.okitjson.newFileStorageSystem(), this);
    }
    getFileStorageSystem() {}
    deleteFileStorageSystem() {}

    // Instance
    newInstance() {
        return new InstanceView(this.okitjson.newInstance(), this);
    }
    getInstance() {}
    deleteInstance() {}

    // Internet Gateway
    newInternetGateway() {
        return new InternetGatewayView(this.okitjson.newInternetGateway(), this);
    }
    getInternetGateway() {}
    deleteInternetGateway() {}

    // Load Balancer
    newLoadBalancer() {
        return new LoadBalancerView(this.okitjson.newLoadBalancer(), this);
    }
    getLoadBalancer() {}
    deleteLoadBalancer() {}

    // Local Peering Gateway
    newLocalPeeringGateway() {
        return new LocalPeeringGatewayView(this.okitjson.newLocalPeeringGateway(), this);
    }
    getLocalPeeringGateway() {}
    deleteLocalPeeringGateway() {}

    // NAT Gateway
    newNATGateway() {
        return new NATGatewayView(this.okitjson.newNATGateway(), this);
    }
    getNATGateway() {}
    deleteNATGateway() {}

    // Network Security Group
    newNetworkSecurityGroup() {
        return new NetworkSecurityGroupView(this.okitjson.newNetworkSecurityGroup(), this);
    }
    getNetworkSecurityGroup() {}
    deleteNetworkSecurityGroup() {}

    // Object Storage Bucket
    newObjectStorageBucket() {
        return new ObjectStorageBucketView(this.okitjson.newObjectStorageBucket(), this);
    }
    getObjectStorageBucket() {}
    deleteObjectStorageBucket() {}

    // Route Table
    newRouteTable() {
        return new RouteTableView(this.okitjson.newRouteTable(), this);
    }
    getRouteTable() {}
    deleteRouteTable() {}

    // Security List
    newSecurityList() {
        return new SecurityListView(this.okitjson.newSecurityList(), this);
    }
    getSecurityList() {}
    deleteSecurityList() {}

    // Service Gateway
    newServiceGateway() {
        return new ServiceGatewayView(this.okitjson.newServiceGateway(), this);
    }
    getServiceGateway() {}
    deleteServiceGateway() {}

    // Subnet
    newSubnet() {
        return new SubnetView(this.okitjson.newSubnet(), this);
    }
    getSubnet() {}
    deleteSubnet() {}

    // Virtual Cloud Network
    newVirtualCloudNetwork() {
        return new VirtualCloudNetworkView(this.okitjson.newVirtualCloudNetwork(), this);
    }
    getVirtualCloudNetwork() {}
    deleteVirtualCloudNetwork() {}

    // Virtual Network Interface
    newVirtualNetworkInterface() {
        return new VirtualNetworkInterface(this.okitjson.newVirtualNetworkInterface(), this);
    }
    getVirtualNetworkInterface() {}
    deleteVirtualNetworkInterface() {}

}

class OkitArtefactView {
    constructor(artefact=null, json_view) {
        this.artefact = artefact;
        this.json_view = json_view;
    }

    get parent_id() {return null;}
    get icon_width() {return 45;}
    get icon_height() {return 45;}
    get icon_dimensions() {return {width: this.icon_width, height: this.icon_height};}
    get collapsed_dimensions() {return this.icon_dimensions;}
    get minimum_dimensions() {return this.icon_dimensions;}
    get dimensions() {return this.minimum_dimensions;}

    getParent() {return null;}

    getParentId() {return this.parent_id;}

    getJsonView() {
        return this.json_view;
    }

    getArtefact() {
        return this.artefact;
    }

    newSVGDefinition() {
        let definition = {};
        definition['artifact'] = this.getArtefact();
        definition['data_type'] = this.getArtefact().getArtifactReference();
        definition['name'] = {show: false, text: this.getArtefact()['display_name']};
        definition['label'] = {show: false, text: this.getArtefact().getArtifactReference()};
        definition['info'] = {show: false, text: this.getArtefact().getArtifactReference()};
        definition['svg'] = {x: 0, y: 0, width: this.icon_width, height: this.icon_height};
        definition['rect'] = {x: 0, y: 0,
            width: this.icon_width, height: this.icon_height,
            width_adjust: 0, height_adjust: 0,
            stroke: {colour: '#F80000', dash: 5},
            fill: 'white', style: 'fill-opacity: .25;'};
        definition['icon'] = {show: true, x_translation: 0, y_translation: 0};
        definition['title_keys'] = [];

        return definition
    }

    getSvgDefinition() {
        alert('Get Svg Definition function "getSvgDefinition()" has not been implemented.');
        return;
    }

    draw() {
        console.group('Drawing (Default) ' + this.getArtifactReference() + ' : ' + this.getArtefact().id + ' [' + this.getParentId() + ']');
        // Get Definition from Sub class
        let definition = this.getSvgDefinition();
        /*
        ** Draw Artefact based of returned definition.
         */
        let id             = definition['artifact']['id'];
        let parent_id      = definition['artifact']['parent_id'];
        let parent_svg_id  = parent_id + "-svg";
        let compartment_id = definition['artifact']['compartment_id'];
        let def_id         = definition['data_type'].replace(/ /g, '') + 'Svg';
        console.info('Creating ' + definition['data_type'] + ' ' + definition['artifact']['display_name'])
        console.info('Id             : ' + id )
        console.info('Parent Id      : ' + parent_id)
        console.info('Parent SVG Id  : ' + parent_svg_id);
        console.info('Compartment Id : ' + compartment_id);
        let rect_x         = definition['rect']['x'];
        let rect_y         = definition['rect']['y'];
        let rect_width     = definition['svg']['width']  + definition['rect']['width_adjust'];
        let rect_height    = definition['svg']['height'] + definition['rect']['height_adjust'];
        if (definition['icon']['y_translation'] < 0) {
            rect_y = Math.abs(definition['icon']['y_translation']);
            rect_height -= rect_y * 2;
        }
        if (definition['icon']['x_translation'] < 0) {
            rect_x = Math.abs(definition['icon']['x_translation']);
            rect_width -= rect_x * 2;
        }
        // Check for Artifact Display Name and if it does not exist set it to Artifact Name
        if (!definition['artifact'].hasOwnProperty('display_name')) {
            definition['artifact']['display_name'] = definition['artifact']['name'];
        }
        // Get Parent SVG
        let parent_svg = d3.select(d3Id(parent_svg_id));
        // Wrapper SVG Element to define ViewBox etc
        let svg = parent_svg.append("svg")
            .attr("id", id + '-svg')
            .attr("data-type", definition['data_type'])
            .attr("x",         definition['svg']['x'])
            .attr("y",         definition['svg']['y'])
            .attr("width",     definition['svg']['width'])
            .attr("height",    definition['svg']['height'])
            .attr("viewBox", "0 0 " + definition['svg']['width'] + " " + definition['svg']['height'])
            .attr("preserveAspectRatio", "xMinYMax meet");

        let rect = svg.append("rect")
            .attr("id", id)
            .attr("x",            rect_x)
            .attr("y",            rect_y)
            .attr("rx",           corner_radius)
            .attr("ry",           corner_radius)
            .attr("width",        rect_width)
            .attr("height",       rect_height)
            .attr("fill",         definition['rect']['fill'])
            .attr("style",        definition['rect']['style'])
            .attr("stroke",       definition['rect']['stroke']['colour'])
            .attr("stroke-width", definition['rect']['stroke']['width'])
            .attr("stroke-dasharray",
                definition['rect']['stroke']['dash'] + ", " + definition['rect']['stroke']['dash']);

        let text_align_x = rect_x;
        let text_anchor = "start"
        if (definition['name']['align']) {
            if (definition['name']['align'] === 'center') {
                text_align_x = (Math.round(definition['svg']['width']-20) / 2)
                text_anchor = "middle"
            }
            else if (definition['name']['align'] === 'right') {
                text_align_x = definition['svg']['width']-20
                text_anchor = "end"
            }
        }
        if (definition['name']['show']) {
            let name_svg = svg.append('svg')
                .attr("x", "10")
                .attr("y", "0")
                .attr("width", container_artifact_label_width)
                .attr("height", definition['svg']['height'])
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 " + container_artifact_label_width + " " + definition['svg']['height']);
            let name = name_svg.append("text")
                .attr("class", "svg-text")
                .attr("id", id + '-display-name')
                .attr("x", text_align_x)
                .attr("y", "55")
                .attr("text-anchor", text_anchor)
                .attr("vector-effects", "non-scaling-size")
                .text(definition['name']['text']);
        }
        if (definition['label']['show']) {
            let label_svg = svg.append('svg')
                .attr("x", "10")
                .attr("y", "0")
                .attr("width", container_artifact_label_width)
                .attr("height", definition['svg']['height'])
                .attr("preserveAspectRatio", "xMinYMax meet")
                .attr("viewBox", "0 0 " + container_artifact_label_width + " " + definition['svg']['height']);
            let name = label_svg.append("text")
                .attr("class", "svg-text")
                .attr("id", id + '-label')
                .attr("x", rect_x)
                .attr("y", definition['svg']['height'] - Math.max(10, (rect_y * 2) - 10))
                .attr("fill", definition['rect']['stroke']['colour'])
                .attr("vector-effects", "non-scaling-size")
                .text(definition['label']['text']);
        }
        if (definition['info']['show']) {
            let info_svg = svg.append('svg')
                .attr("x", Math.round(definition['svg']['width'] - container_artifact_info_width))
                .attr("y", "0")
                .attr("width", container_artifact_info_width)
                .attr("height", definition['svg']['height'])
                .attr("preserveAspectRatio", "xMinYMax meet")
                .attr("viewBox", "0 0 " + container_artifact_info_width + " " + definition['svg']['height']);
            let name = info_svg.append("text")
                .attr("class", "svg-text")
                .attr("id", id + '-info')
                .attr("x", 0)
                .attr("y", definition['svg']['height'] - Math.max(10, (rect_y * 2) - 10))
                .attr("fill", definition['rect']['stroke']['colour'])
                .attr("vector-effects", "non-scaling-size")
                .text(definition['info']['text']);
        }

        let svg_transform = ""
        if (definition['svg']['align']) {
            if (definition['svg']['align'] === 'center') {
                svg_transform = "translate(" + (definition['svg']['width']/2 - icon_width/2) + " , 0)"
            } else if (definition['svg']['align'] === 'right') {
                svg_transform = "translate(" + (definition['svg']['width'] - icon_width - icon_spacing) + " , 0)"
            }
        }

        svg.append('g')
            .append("use")
            .attr("xlink:href","#" + def_id)
            .attr("transform", svg_transform);

        svg.append("title")
            .attr("id", id + '-title')
            .text(definition['data_type'] + ": " + definition['artifact']['display_name']);

        // Set common attributes on svg element and children
        svg.on("contextmenu", handleContextMenu)
            .on("dragenter",  dragEnter)
            .on("dragover",   dragOver)
            .on("dragleave",  dragLeave)
            .on("drop",       dragDrop)
            .on("dragend",    dragEnd)
            .attr("data-type",           definition['data_type'])
            .attr("data-okit-id",        id)
            .attr("data-parent-id",      parent_id)
            .attr("data-compartment-id", compartment_id)
            .selectAll("*")
            .attr("data-type",           definition['data_type'])
            .attr("data-okit-id",        id)
            .attr("data-parent-id",      parent_id)
            .attr("data-compartment-id", compartment_id);
        /*
        ** Add Properties Load Event to created svg. We require the definition of the local variable "me" so that it can
        ** be used in the function dur to the fact that using "this" in the function will refer to the function not the
        ** Artifact.
         */
        let me = this;
        svg.on("click", function() {
            me.loadProperties();
            $('.highlight:not(' + jqId(me.id) +')').removeClass('highlight');
            $(jqId(me.id)).toggleClass('highlight');
            $(jqId(me.id)).hasClass('highlight') ? selectedArtefact = me.id : selectedArtefact = null;
            me.loadValueProposition();
            d3.event.stopPropagation();
        });
        console.groupEnd();
        return svg;
    }

    /*
    ** Property Sheet Load function
     */
    loadProperties() {
        $(jqId(PROPERTIES_PANEL)).load("propertysheets/empty.html");
    }


    /*
    ** Load and display Value Proposition
     */
    loadValueProposition() {
        $(jqId(VALUE_PROPOSITION_PANEL)).load("valueproposition/oci.html");
    }

    /*
    ** Static Functionality
     */
    static getArtifactReference() {
        alert('Get Artifact Reference function "getArtifactReference()" has not been implemented.');
        return;
    }

    static getDropTargets() {
        console.warn('Get Drop Targets not implements');
        return [];
    }

    static getConnectTargets() {
        console.warn('Get Connect Targets not implements');
        return [];
    }

    /*
    ** Instance Versions of Static Functions
     */

    getArtifactReference() {
        return this.constructor.getArtifactReference();
    }

    getDropTargets() {
        // Return list of Artifact names
        return this.constructor.getDropTargets();
    }

    getConnectTargets() {
        return this.constructor.getgetConnectTargets();
    }

}

let okitJsonView = null;
