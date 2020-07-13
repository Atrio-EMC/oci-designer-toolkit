/*
** Copyright (c) 2020, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
console.info('Loaded OKIT Model Javascript');

/*
** Representation of overall OKIT Model Data Structure
 */
class OkitJson {
    /*
    ** Create
     */
    constructor(okit_json_string = '') {
        this.title = "OKIT OCI Visualiser Json";
        this.description = "OKIT Generic OCI Json which can be used to generate ansible, terraform, .......";
        this.okit_version = okitVersion;
        this.compartments = [];
        this.autonomous_databases = [];
        this.block_storage_volumes = [];
        this.containers = [];
        this.database_systems = [];
        this.dynamic_routing_gateways = [];
        this.fast_connects = [];
        this.file_storage_systems = [];
        this.instances = [];
        this.internet_gateways = [];
        this.load_balancers = [];
        this.local_peering_gateways = [];
        this.nat_gateways = [];
        this.network_security_groups = [];
        this.object_storage_buckets = [];
        this.remote_peering_gateways = [];
        this.route_tables = [];
        this.security_lists = [];
        this.service_gateways = [];
        this.subnets = [];
        this.virtual_cloud_networks = [];
        //this.web_application_firewalls = [];

        if (okit_json_string !== undefined && okit_json_string.length > 0) {
            this.load(JSON.parse(okit_json_string));
        }
    }

    /*
    ** Load Simple Json Structure and build Object Based JSON
     */
    load(okit_json) {
        console.groupCollapsed('Load OKIT Json');
        // Compartments
        if (okit_json.hasOwnProperty('compartments')) {
            for (let artifact of okit_json['compartments']) {
                if (artifact.parent_id && artifact.parent_id === ROOT_CANVAS_ID) {
                    artifact.parent_id = ROOT_CANVAS_ID;
                    console.info('Adding Root Compartment ' + artifact.name);
                } else {
                    artifact.parent_id = artifact.compartment_id;
                }
                let obj = this.newCompartment(artifact);
                console.info(obj);
            }
        }

        // Compartment Subcomponents
        // Autonomous Databases
        if (okit_json.hasOwnProperty('autonomous_databases')) {
            for (let artifact of okit_json['autonomous_databases']) {
                artifact.parent_id = artifact.compartment_id;
                let obj = this.newAutonomousDatabase(artifact);
                console.info(obj);
            }
        }
        // Block Storage Volumes
        if (okit_json.hasOwnProperty('block_storage_volumes')) {
            for (let artifact of okit_json['block_storage_volumes']) {
                artifact.parent_id = artifact.compartment_id;
                let obj = this.newBlockStorageVolume(artifact);
                console.info(obj);
            }
        }
        // Object Storage Buckets
        if (okit_json.hasOwnProperty('object_storage_buckets')) {
            for (let artifact of okit_json['object_storage_buckets']) {
                artifact.parent_id = artifact.compartment_id;
                let obj = this.newObjectStorageBucket(artifact);
                console.info(obj);
            }
        }
        // Virtual Cloud Networks
        // Turn Off Default Security List / Route Table Processing
        let okitSettingsClone = JSON.clone(okitSettings);
        okitSettings.is_default_route_table   = false;
        okitSettings.is_default_security_list = false;
        if (okit_json.hasOwnProperty('virtual_cloud_networks')) {
            for (let artifact of okit_json['virtual_cloud_networks']) {
                artifact.parent_id = artifact.compartment_id;
                let obj = this.newVirtualCloudNetwork(artifact);
                console.info(obj);
            }
        }
        // Reset
        okitSettings.is_default_route_table   = okitSettingsClone.is_default_route_table;
        okitSettings.is_default_security_list = okitSettingsClone.is_default_security_list;
        // Web Application Firewall
        if (okit_json.hasOwnProperty('web_application_firewalls')) {
            for (let artifact of okit_json['web_application_firewalls']) {
                artifact.parent_id = artifact.compartment_id;
                let obj = this.newWebApplicationFirewall(artifact);
                console.info(obj);
            }
        }
        // Dynamic Routing Gateways
        if (okit_json.hasOwnProperty('dynamic_routing_gateways')) {
            for (let artifact of okit_json['dynamic_routing_gateways']) {
                artifact.parent_id = artifact.compartment_id;
                let obj = this.newDynamicRoutingGateway(artifact);
                console.info(obj);
            }
        }

        // Virtual Cloud Network Sub Components
        // Internet Gateways
        if (okit_json.hasOwnProperty('internet_gateways')) {
            for (let artifact of okit_json['internet_gateways']) {
                artifact.parent_id = artifact.vcn_id;
                let obj = this.newInternetGateway(artifact);
                console.info(obj);
            }
        }
        // NAT Gateway
        if (okit_json.hasOwnProperty('nat_gateways')) {
            for (let artifact of okit_json['nat_gateways']) {
                artifact.parent_id = artifact.vcn_id;
                let obj = this.newNATGateway(artifact);
                console.info(obj);
            }
        }
        // Route Tables
        if (okit_json.hasOwnProperty('route_tables')) {
            for (let artifact of okit_json['route_tables']) {
                artifact.parent_id = artifact.vcn_id;
                let obj = this.newRouteTable(artifact);
                console.info(obj);
            }
        }
        // Security Lists
        if (okit_json.hasOwnProperty('security_lists')) {
            for (let artifact of okit_json['security_lists']) {
                artifact.parent_id = artifact.vcn_id;
                let obj = this.newSecurityList(artifact);
                console.info(obj);
            }
        }
        // Network Security Groups
        if (okit_json.hasOwnProperty('network_security_groups')) {
            for (let artifact of okit_json['network_security_groups']) {
                artifact.parent_id = artifact.vcn_id;
                let obj = this.newNetworkSecurityGroup(artifact);
                console.info(obj);
            }
        }
        // Service Gateways
        if (okit_json.hasOwnProperty('service_gateways')) {
            for (let artifact of okit_json['service_gateways']) {
                artifact.parent_id = artifact.vcn_id;
                let obj = this.newServiceGateway(artifact);
                console.info(obj);
            }
        }
        // Local Peering Gateways
        if (okit_json.hasOwnProperty('local_peering_gateways')) {
            for (let artifact of okit_json['local_peering_gateways']) {
                artifact.parent_id = artifact.vcn_id;
                let obj = this.newLocalPeeringGateway(artifact);
                console.info(obj);
            }
        }
        // Subnets
        if (okit_json.hasOwnProperty('subnets')) {
            for (let artifact of okit_json['subnets']) {
                artifact.parent_id = artifact.vcn_id;
                let obj = this.newSubnet(artifact);
                console.info(obj);
            }
        }

        // Subnet Subcomponents
        // File Storage Systems
        if (okit_json.hasOwnProperty('file_storage_systems')) {
            for (let artifact of okit_json['file_storage_systems']) {
                artifact.parent_id = artifact.subnet_id;
                let obj = this.newFileStorageSystem(artifact);
                console.info(obj);
            }
        }
        // Database Systems
        if (okit_json.hasOwnProperty('database_systems')) {
            for (let artifact of okit_json['database_systems']) {
                artifact.parent_id = artifact.subnet_id;
                let obj = this.newDatabaseSystem(artifact);
                console.info(obj);
            }
        }
        // Instances
        if (okit_json.hasOwnProperty('instances')) {
            for (let artifact of okit_json['instances']) {
                let subnet = this.getSubnet(artifact.subnet_id)
                if (subnet && subnet.compartment_id === artifact.compartment_id) {
                    artifact.parent_id = artifact.subnet_id;
                } else {
                    artifact.parent_id = artifact.compartment_id;
                }
                let obj = this.newInstance(artifact);
                console.info(obj);
            }
        }
        // Load Balancers
        if (okit_json.hasOwnProperty('load_balancers')) {
            for (let artifact of okit_json['load_balancers']) {
                if (artifact.hasOwnProperty('subnet_id')) {
                    artifact.parent_id = artifact.subnet_id;
                } else {
                    artifact.parent_id = artifact.subnet_ids[0];
                    artifact.subnet_id = artifact.subnet_ids[0];
                }
                let obj = this.newLoadBalancer(artifact);
                console.info(obj);
            }
        }
        console.groupEnd();
    }

    /*
    ** Artifact Processing
     */

    // Autonomous Database
    newAutonomousDatabase(data, parent=null) {
        console.info('New Autonomous Database');
        // Because we are direct sub components of Compartment set compartment_id to parent_id not the parents compartment_id
        data.compartment_id = data.parent_id;
        this.autonomous_databases.push(new AutonomousDatabase(data, this, parent));
        return this.autonomous_databases[this.autonomous_databases.length - 1];
    }
    getAutonomousDatabases() {
        return this.autonomous_databases;
    }
    getAutonomousDatabase(id='') {
        for (let artefact of this.getAutonomousDatabases()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteAutonomousDatabase(id) {
        for (let i = 0; i < this.autonomous_databases.length; i++) {
            if (this.autonomous_databases[i].id === id) {
                this.autonomous_databases[i].delete();
                this.autonomous_databases.splice(i, 1);
                break;
            }
        }
    }

    // Block Storage Volume
    newBlockStorageVolume(data, parent=null) {
        console.info('New Block Storage Volume');
        // Because we are direct sub components of Compartment set compartment_id to parent_id not the parents compartment_id
        data.compartment_id = data.parent_id;
        this.block_storage_volumes.push(new BlockStorageVolume(data, this, parent));
        return this.block_storage_volumes[this.block_storage_volumes.length - 1];
    }
    getBlockStorageVolumes() {
        return this.block_storage_volumes;
    }
    getBlockStorageVolume(id='') {
        for (let artefact of this.getBlockStorageVolumes()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteBlockStorageVolume(id) {
        for (let i = 0; i < this.block_storage_volumes.length; i++) {
            if (this.block_storage_volumes[i].id === id) {
                this.block_storage_volumes[i].delete();
                this.block_storage_volumes.splice(i, 1);
                break;
            }
        }
    }

    // Compartment
    newCompartment(data = {}, parent=null) {
        console.info('New Compartment');
        // Because we are direct sub components of Compartment set compartment_id to parent_id not the parents compartment_id
        data.compartment_id = data.parent_id;
        this.compartments.push(new Compartment(data, this, parent));
        return this.compartments[this.compartments.length - 1];
    }
    getCompartments() {
        return this.compartments;
    }
    getCompartment(id='') {
        for (let artefact of this.getCompartments()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteCompartment(id) {
        for (let i = 0; i < this.compartments.length; i++) {
            if (this.compartments[i].id === id) {
                this.compartments[i].delete();
                this.compartments.splice(i, 1);
                break;
            }
        }
    }

    // Database System
    newDatabaseSystem(data, parent=null) {
        console.info('New Database System');
        this.database_systems.push(new DatabaseSystem(data, this, parent));
        return this.database_systems[this.database_systems.length - 1];
    }
    getDatabaseSystems() {
        return this.database_systems;
    }
    getDatabaseSystem(id='') {
        for (let artefact of this.getDatabaseSystems()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteDatabaseSystem(id) {
        for (let i = 0; i < this.database_systems.length; i++) {
            if (this.database_systems[i].id === id) {
                this.database_systems[i].delete();
                this.database_systems.splice(i, 1);
                break;
            }
        }
    }

    // Dynamic Routing Gateway
    newDynamicRoutingGateway(data, parent=null) {
        console.info('New Dynamic Routing Gateway');
        this.dynamic_routing_gateways.push(new DynamicRoutingGateway(data, this, parent));
        return this.dynamic_routing_gateways[this.dynamic_routing_gateways.length - 1];
    }
    getDynamicRoutingGateways() {
        return this.dynamic_routing_gateways;
    }
    getDynamicRoutingGateway(id='') {
        for (let artefact of this.getDynamicRoutingGateways()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteDynamicRoutingGateway(id) {
        for (let i = 0; i < this.dynamic_routing_gateways.length; i++) {
            if (this.dynamic_routing_gateways[i].id === id) {
                this.dynamic_routing_gateways[i].delete();
                this.dynamic_routing_gateways.splice(i, 1);
                break;
            }
        }
    }

    // FastConnect
    newFastConnect(data, parent=null) {
        console.info('New FastConnect');
        this.fast_connects.push(new FastConnect(data, this, parent));
        return this.fast_connects[this.fast_connects.length - 1];
    }
    getFastConnects() {
        return this.fast_connects;
    }
    getFastConnect(id='') {
        for (let artefact of this.getFastConnects()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteFastConnect(id) {
        for (let i = 0; i < this.fast_connects.length; i++) {
            if (this.fast_connects[i].id === id) {
                this.fast_connects[i].delete();
                this.fast_connects.splice(i, 1);
                break;
            }
        }
    }

    // File Storage System
    newFileStorageSystem(data, parent=null) {
        console.info('New File Storage System');
        this.file_storage_systems.push(new FileStorageSystem(data, this, parent));
        return this.file_storage_systems[this.file_storage_systems.length - 1];
    }
    getFileStorageSystems() {
        return this.file_storage_systems;
    }
    getFileStorageSystem(id='') {
        for (let artefact of this.getFileStorageSystems()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteFileStorageSystem(id) {
        for (let i = 0; i < this.file_storage_systems.length; i++) {
            if (this.file_storage_systems[i].id === id) {
                this.file_storage_systems[i].delete();
                this.file_storage_systems.splice(i, 1);
                break;
            }
        }
    }

    // Instance
    newInstance(data, parent=null) {
        console.info('New Instance');
        this.instances.push(new Instance(data, this, parent));
        return this.instances[this.instances.length - 1];
    }
    getInstances() {
        return this.instances;
    }
    getInstance(id='') {
        for (let artefact of this.getInstances()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteInstance(id) {
        for (let i = 0; i < this.instances.length; i++) {
            if (this.instances[i].id === id) {
                this.instances[i].delete();
                this.instances.splice(i, 1);
                break;
            }
        }
    }

    // Internet Gateway
    newInternetGateway(data, parent=null) {
        console.info('New Internet Gateway');
        for (let gateway of this.internet_gateways) {
            if (gateway.vcn_id === data.parent_id) {
                // We are only allowed a single Internet Gateway peer VCN
                if (parent) {
                    alert('The maximum limit of 1 for Internet Gateway per Virtual Cloud Network has been exceeded in ' + parent.display_name);
                }
                return null;
            }
        }
        this.internet_gateways.push(new InternetGateway(data, this, parent));
        return this.internet_gateways[this.internet_gateways.length - 1];
    }
    getInternetGateways() {
        return this.internet_gateways;
    }
    getInternetGateway(id='') {
        for (let artefact of this.getInternetGateways()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteInternetGateway(id) {
        for (let i = 0; i < this.internet_gateways.length; i++) {
            if (this.internet_gateways[i].id === id) {
                this.internet_gateways[i].delete();
                this.internet_gateways.splice(i, 1);
                break;
            }
        }
    }

    // Load Balancer
    newLoadBalancer(data, parent=null) {
        console.info('New Load Balancer');
        this.load_balancers.push(new LoadBalancer(data, this, parent));
        return this.load_balancers[this.load_balancers.length - 1];
    }
    getloadBalancers() {
        return this.load_balancers;
    }
    getLoadBalancer(id='') {
        for (let artefact of this.getloadBalancers()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteLoadBalancer(id) {
        for (let i = 0; i < this.load_balancers.length; i++) {
            if (this.load_balancers[i].id === id) {
                this.load_balancers[i].delete();
                this.load_balancers.splice(i, 1);
                break;
            }
        }
    }

    // Local Peering Gateway
    newLocalPeeringGateway(data, parent=null) {
        console.info('New Local Peering Gateway');
        this.local_peering_gateways.push(new LocalPeeringGateway(data, this, parent));
        return this.local_peering_gateways[this.local_peering_gateways.length - 1];
    }
    getLocalPeeringGateways() {
        return this.local_peering_gateways;
    }
    getLocalPeeringGateway(id='') {
        for (let artefact of this.getLocalPeeringGateways()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteLocalPeeringGateway(id) {
        for (let i = 0; i < this.local_peering_gateways.length; i++) {
            if (this.local_peering_gateways[i].id === id) {
                this.local_peering_gateways[i].delete();
                this.local_peering_gateways.splice(i, 1);
                break;
            }
        }
    }

    // NAT Gateway
    newNATGateway(data, parent=null) {
        console.info('New NAT Gateway');
        for (let gateway of this.nat_gateways) {
            if (gateway.vcn_id === data.parent_id) {
                // We are only allowed a single NAT Gateway peer VCN
                if (parent) {
                    alert('The maximum limit of 1 for NAT Gateway per Virtual Cloud Network has been exceeded in ' + parent.display_name);
                }
                return null;
            }
        }
        this.nat_gateways.push(new NATGateway(data, this, parent));
        return this.nat_gateways[this.nat_gateways.length - 1];
    }
    getNATGateways() {
        return this.nat_gateways;
    }
    getNATGateway(id='') {
        for (let artefact of this.getNATGateways()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteNATGateway(id) {
        for (let i = 0; i < this.nat_gateways.length; i++) {
            if (this.nat_gateways[i].id === id) {
                this.nat_gateways[i].delete();
                this.nat_gateways.splice(i, 1);
                break;
            }
        }
    }

    // Network Security Group
    newNetworkSecurityGroup(data, parent=null) {
        console.info('New Network Security Group');
        this.network_security_groups.push(new NetworkSecurityGroup(data, this, parent));
        return this.network_security_groups[this.network_security_groups.length - 1];
    }
    getNetworkSecurityGroups() {
        return this.network_security_groups;
    }
    getNetworkSecurityGroup(id='') {
        for (let artefact of this.getNetworkSecurityGroups()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteNetworkSecurityGroup(id) {
        for (let i = 0; i < this.network_security_groups.length; i++) {
            if (this.network_security_groups[i].id === id) {
                this.network_security_groups[i].delete();
                this.network_security_groups.splice(i, 1);
                break;
            }
        }
    }

    // Object Storage Bucket
    newObjectStorageBucket(data, parent=null) {
        console.info('New Object Storage Bucket');
        // Because we are direct sub components of Compartment set compartment_id to parent_id not the parents compartment_id
        data.compartment_id = data.parent_id;
        this.object_storage_buckets.push(new ObjectStorageBucket(data, this, parent));
        return this.object_storage_buckets[this.object_storage_buckets.length - 1];
    }
    getObjectStorageBuckets() {
        return this.object_storage_buckets;
    }
    getObjectStorageBucket(id='') {
        for (let artefact of this.getObjectStorageBuckets()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteObjectStorageBucket(id) {
        for (let i = 0; i < this.object_storage_buckets.length; i++) {
            if (this.object_storage_buckets[i].id === id) {
                this.object_storage_buckets[i].delete();
                this.object_storage_buckets.splice(i, 1);
                break;
            }
        }
    }

    // Route Table
    newRouteTable(data, parent=null) {
        console.info('New Route Table');
        this.route_tables.push(new RouteTable(data, this, parent));
        return this.route_tables[this.route_tables.length - 1];
    }
    getRouteTables() {
        return this.route_tables;
    }
    getRouteTable(id='') {
        for (let artefact of this.getRouteTables()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteRouteTable(id) {
        for (let i = 0; i < this.route_tables.length; i++) {
            if (this.route_tables[i].id === id) {
                this.route_tables[i].delete();
                this.route_tables.splice(i, 1);
                break;
            }
        }
    }

    // Security List
    newSecurityList(data, parent=null) {
        console.info('New Security List');
        this.security_lists.push(new SecurityList(data, this, parent));
        return this.security_lists[this.security_lists.length - 1];
    }
    getSecurityLists() {
        return this.security_lists;
    }
    getSecurityList(id='') {
        for (let artefact of this.getSecurityLists()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteSecurityList(id) {
        for (let i = 0; i < this.security_lists.length; i++) {
            if (this.security_lists[i].id === id) {
                this.security_lists[i].delete();
                this.security_lists.splice(i, 1);
                break;
            }
        }
    }

    // Service Gateway
    newServiceGateway(data, parent=null) {
        console.info('New Service Gateway');
        for (let gateway of this.service_gateways) {
            if (gateway.vcn_id === data.parent_id) {
                // We are only allowed a single Service Gateway peer VCN
                if (parent) {
                    alert('The maximum limit of 1 for Service Gateway per Virtual Cloud Network has been exceeded in ' + parent.display_name);
                }
                return null;
            }
        }
        this.service_gateways.push(new ServiceGateway(data, this, parent));
        return this.service_gateways[this.service_gateways.length - 1];
    }
    getServiceGateways() {
        return this.service_gateways;
    }
    getServiceGateway(id='') {
        for (let artefact of this.getServiceGateways()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteServiceGateway(id) {
        for (let i = 0; i < this.service_gateways.length; i++) {
            if (this.service_gateways[i].id === id) {
                this.service_gateways[i].delete();
                this.service_gateways.splice(i, 1);
                break;
            }
        }
    }

    // Subnet
    newSubnet(data, parent=null) {
        console.info('New Subnet');
        this.subnets.push(new Subnet(data, this, parent));
        return this.subnets[this.subnets.length - 1];
    }
    getSubnets() {
        return this.subnets;
    }
    getSubnet(id='') {
        for (let artefact of this.getSubnets()) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteSubnet(id) {
        for (let i = 0; i < this.subnets.length; i++) {
            if (this.subnets[i].id === id) {
                this.subnets[i].delete();
                this.subnets.splice(i, 1);
                break;
            }
        }
    }

    // Virtual Cloud Network
    newVirtualCloudNetwork(data, parent=null) {
        console.info('New Virtual Cloud Network');
        // Because we are direct sub components of Compartment set compartment_id to parent_id not the parents compartment_id
        data.compartment_id = data.parent_id;
        this.virtual_cloud_networks.push(new VirtualCloudNetwork(data, this, parent));
        return this.virtual_cloud_networks[this.virtual_cloud_networks.length - 1];
    }
    getVirtualCloudNetworks() {
        return this.virtual_cloud_networks;
    }
    getVirtualCloudNetwork(id='') {
        for (let artefact of this.virtual_cloud_networks) {
            if (artefact.id === id) {
                return artefact;
            }
        }
        return undefined;
    }
    deleteVirtualCloudNetwork(id) {
        for (let i = 0; i < this.virtual_cloud_networks.length; i++) {
            if (this.virtual_cloud_networks[i].id === id) {
                this.virtual_cloud_networks[i].delete();
                this.virtual_cloud_networks.splice(i, 1);
                break;
            }
        }
    }
    getVcn(id='') {
        return this.getVirtualCloudNetwork(id);
    }

    /*
    ** Export Functions
     */
    // Terraform
    exportTerraform() {}
    // Ansible
    exportAnsible() {}
    // Resource Manager
    exportResourceManager() {}

    /*
    ** Data Validation
     */
    validate(callback=null) {
        $.ajax({
            type: 'post',
            url: 'validate',
            dataType: 'text',
            contentType: 'application/json',
            data: JSON.stringify(this),
            success: function(resp) {
                console.info('Validation Response : ' + resp);
                if (callback && callback !== null) callback(JSON.parse(resp));
            },
            error: function(xhr, status, error) {
                console.info('Status : '+ status)
                console.info('Error : '+ error)
            }
        });
    }

    /*
    ** Calculate price
     */
    estimateCost(callback=null) {
        $.ajax({
            type: 'post',
            url: 'pricing/estimate',
            dataType: 'text',
            contentType: 'application/json',
            data: JSON.stringify(this),
            success: function(resp) {
                console.info('Validation Response : ' + resp);
                if (callback && callback !== null) callback(JSON.parse(resp));
            },
            error: function(xhr, status, error) {
                console.info('Status : '+ status)
                console.info('Error : '+ error)
            }
        });
    }

}

/*
** Model reptresentation of each artefact within OCI
 */
class OkitArtifact {
    /*
    ** Create
     */
    constructor (okitjson) {
        this.getOkitJson = function() {return okitjson};
        // Add Id
        this.id = 'okit.' + this.constructor.name.toLowerCase() + '.' + uuidv4();
        this.parent_id = null;
        // Add default for common Tag variables
        this.freeform_tags = {};
        this.defined_tags = {};
    }


    /*
    ** Clone Functionality
     */
    clone() {
        alert('Clone function "clone()" has not been implemented.');
        return;
    }

    /*
    ** Merge Functionality
     */
    merge(update) {
        $.extend(true, this, update);
    }

    /*
    ** Convert Functionality will be overridden to allow backwards compatibility
     */
    convert() {
        if (this.parent_id) {delete this.parent_id;}
    }

    /*
    ** Get this Artifacts Parent Object
     */
    getParent() {
        if (this.getParentId() && $(jqId(this.getParentId())).data('type')) {
            console.info('Parent Id : ' + this.getParentId());
            const getFunction = 'get' + $(jqId(this.getParentId())).data('type').split(' ').join('');
            console.info('>>>>>>>>> Parent ' + this.getOkitJson()[getFunction](this.getParentId()).display_name);
            return this.getOkitJson()[getFunction](this.getParentId());
        }
        console.info('>>>>>>>>> Parent NULL');
        return null;
    }

    getParentId() {
        return this.parent_id;
    }
    /*
    ** Get the Artifact name this Artifact will be know by.
     */
    getArtifactReference() {
        //alert('Get Artifact Reference function "getArtifactReference()" has not been implemented.');
        return this.constructor.getArtifactReference();
    }

    artifactToElement(name) {
        return name.toLowerCase().split(' ').join('_') + 's';
    }


    /*
    ** Delete Processing
     */
    delete() {
        console.groupCollapsed('Delete (Default) ' + this.getArtifactReference() + ' : ' + this.id);
        // Delete Child Artifacts
        this.deleteChildren();
        // Remove SVG Element
        if ($(jqId(this.id + "-svg")).length) {$(jqId(this.id + "-svg")).remove()}
        //d3.select("#" + this.id + "-svg").remove()
        console.groupEnd();
    }

    deleteChildren() {
        console.info('Default empty deleteChildren()');
    }

    getChildren(artifact) {
        console.info('Default empty getChildren()');
    }


    /*
    ** Define Allowable SVG Drop Targets
     */
    getDropTargets() {
        // Return list of Artifact names
        return this.constructor.getDropTargets();
    }


    /*
    ** Default name generation
     */
    generateDefaultName(count = 0) {
        return this.getNamePrefix() + ('000' + count).slice(-3);
    }

    getNamePrefix() {
        return 'okit-';
    }

    getAvailabilityDomainNumber(availability_domain) {
        if (availability_domain) {
            return availability_domain.slice(-1);
        } else {
            return availability_domain;
        }
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

    static query(request={}, region='') {
        console.error('Query not implemented');
    }

}

