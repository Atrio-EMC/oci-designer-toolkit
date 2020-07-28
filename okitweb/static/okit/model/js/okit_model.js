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
            for (let artefact of okit_json['compartments']) {
                if (artefact.parent_id && artefact.parent_id === ROOT_CANVAS_ID) {
                    artefact.parent_id = ROOT_CANVAS_ID;
                    console.info('Adding Root Compartment ' + artefact.name);
                } else {
                    artefact.parent_id = artefact.compartment_id;
                }
                let obj = this.newCompartment(artefact);
                console.info(obj);
            }
        }

        // Compartment Subcomponents
        // Autonomous Databases
        if (okit_json.hasOwnProperty('autonomous_databases')) {
            for (let artefact of okit_json['autonomous_databases']) {
                artefact.parent_id = artefact.compartment_id;
                let obj = this.newAutonomousDatabase(artefact);
                console.info(obj);
            }
        }
        // Block Storage Volumes
        if (okit_json.hasOwnProperty('block_storage_volumes')) {
            for (let artefact of okit_json['block_storage_volumes']) {
                artefact.parent_id = artefact.compartment_id;
                let obj = this.newBlockStorageVolume(artefact);
                console.info(obj);
            }
        }
        // Object Storage Buckets
        if (okit_json.hasOwnProperty('object_storage_buckets')) {
            for (let artefact of okit_json['object_storage_buckets']) {
                artefact.parent_id = artefact.compartment_id;
                let obj = this.newObjectStorageBucket(artefact);
                console.info(obj);
            }
        }
        // Virtual Cloud Networks
        // Turn Off Default Security List / Route Table Processing
        let okitSettingsClone = JSON.clone(okitSettings);
        okitSettings.is_default_route_table   = false;
        okitSettings.is_default_security_list = false;
        if (okit_json.hasOwnProperty('virtual_cloud_networks')) {
            for (let artefact of okit_json['virtual_cloud_networks']) {
                artefact.parent_id = artefact.compartment_id;
                let obj = this.newVirtualCloudNetwork(artefact);
                console.info(obj);
            }
        }
        // Reset
        okitSettings.is_default_route_table   = okitSettingsClone.is_default_route_table;
        okitSettings.is_default_security_list = okitSettingsClone.is_default_security_list;
        // Web Application Firewall
        if (okit_json.hasOwnProperty('web_application_firewalls')) {
            for (let artefact of okit_json['web_application_firewalls']) {
                artefact.parent_id = artefact.compartment_id;
                let obj = this.newWebApplicationFirewall(artefact);
                console.info(obj);
            }
        }
        // Dynamic Routing Gateways
        if (okit_json.hasOwnProperty('dynamic_routing_gateways')) {
            for (let artefact of okit_json['dynamic_routing_gateways']) {
                artefact.parent_id = artefact.compartment_id;
                let obj = this.newDynamicRoutingGateway(artefact);
                console.info(obj);
            }
        }

        // Virtual Cloud Network Sub Components
        // Internet Gateways
        if (okit_json.hasOwnProperty('internet_gateways')) {
            for (let artefact of okit_json['internet_gateways']) {
                artefact.parent_id = artefact.vcn_id;
                let obj = this.newInternetGateway(artefact);
                console.info(obj);
            }
        }
        // NAT Gateway
        if (okit_json.hasOwnProperty('nat_gateways')) {
            for (let artefact of okit_json['nat_gateways']) {
                artefact.parent_id = artefact.vcn_id;
                let obj = this.newNATGateway(artefact);
                console.info(obj);
            }
        }
        // Route Tables
        if (okit_json.hasOwnProperty('route_tables')) {
            for (let artefact of okit_json['route_tables']) {
                artefact.parent_id = artefact.vcn_id;
                let obj = this.newRouteTable(artefact);
                console.info(obj);
            }
        }
        // Security Lists
        if (okit_json.hasOwnProperty('security_lists')) {
            for (let artefact of okit_json['security_lists']) {
                artefact.parent_id = artefact.vcn_id;
                let obj = this.newSecurityList(artefact);
                console.info(obj);
            }
        }
        // Network Security Groups
        if (okit_json.hasOwnProperty('network_security_groups')) {
            for (let artefact of okit_json['network_security_groups']) {
                artefact.parent_id = artefact.vcn_id;
                let obj = this.newNetworkSecurityGroup(artefact);
                console.info(obj);
            }
        }
        // Service Gateways
        if (okit_json.hasOwnProperty('service_gateways')) {
            for (let artefact of okit_json['service_gateways']) {
                artefact.parent_id = artefact.vcn_id;
                let obj = this.newServiceGateway(artefact);
                console.info(obj);
            }
        }
        // Local Peering Gateways
        if (okit_json.hasOwnProperty('local_peering_gateways')) {
            for (let artefact of okit_json['local_peering_gateways']) {
                artefact.parent_id = artefact.vcn_id;
                let obj = this.newLocalPeeringGateway(artefact);
                console.info(obj);
            }
        }
        // Subnets
        if (okit_json.hasOwnProperty('subnets')) {
            for (let artefact of okit_json['subnets']) {
                artefact.parent_id = artefact.vcn_id;
                let obj = this.newSubnet(artefact);
                console.info(obj);
            }
        }

        // Subnet Subcomponents
        // File Storage Systems
        if (okit_json.hasOwnProperty('file_storage_systems')) {
            for (let artefact of okit_json['file_storage_systems']) {
                artefact.parent_id = artefact.subnet_id;
                let obj = this.newFileStorageSystem(artefact);
                console.info(obj);
            }
        }
        // Database Systems
        if (okit_json.hasOwnProperty('database_systems')) {
            for (let artefact of okit_json['database_systems']) {
                artefact.parent_id = artefact.subnet_id;
                let obj = this.newDatabaseSystem(artefact);
                console.info(obj);
            }
        }
        // Instances
        if (okit_json.hasOwnProperty('instances')) {
            for (let artefact of okit_json['instances']) {
                let subnet = this.getSubnet(artefact.subnet_id)
                if (subnet && subnet.compartment_id === artefact.compartment_id) {
                    artefact.parent_id = artefact.subnet_id;
                } else {
                    artefact.parent_id = artefact.compartment_id;
                }
                let obj = this.newInstance(artefact);
                console.info(obj);
            }
        }
        // Load Balancers
        if (okit_json.hasOwnProperty('load_balancers')) {
            for (let artefact of okit_json['load_balancers']) {
                if (artefact.hasOwnProperty('subnet_id')) {
                    artefact.parent_id = artefact.subnet_id;
                } else {
                    artefact.parent_id = artefact.subnet_ids[0];
                    artefact.subnet_id = artefact.subnet_ids[0];
                }
                let obj = this.newLoadBalancer(artefact);
                console.info(obj);
            }
        }
        console.groupEnd();
    }

    /*
    ** Artifact Processing
     */

    // Autonomous Database
    newAutonomousDatabase(data) {
        console.info('New Autonomous Database');
        this.autonomous_databases.push(new AutonomousDatabase(data, this));
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
    newBlockStorageVolume(data) {
        console.info('New Block Storage Volume');
        this.block_storage_volumes.push(new BlockStorageVolume(data, this));
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
    newCompartment(data = {}) {
        console.info('New Compartment');
        this.compartments.push(new Compartment(data, this));
        return this.compartments[this.compartments.length - 1];
    }
    getCompartments() {return this.compartments;}
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
    newDatabaseSystem(data) {
        console.info('New Database System');
        this.database_systems.push(new DatabaseSystem(data, this));
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
    newDynamicRoutingGateway(data) {
        console.info('New Dynamic Routing Gateway');
        this.dynamic_routing_gateways.push(new DynamicRoutingGateway(data, this));
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
    newFastConnect(data) {
        console.info('New FastConnect');
        this.fast_connects.push(new FastConnect(data, this));
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
    newFileStorageSystem(data) {
        console.info('New File Storage System');
        this.file_storage_systems.push(new FileStorageSystem(data, this));
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
    newInstance(data) {
        console.info('New Instance');
        this.instances.push(new Instance(data, this));
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
    newInternetGateway(data) {
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
        this.internet_gateways.push(new InternetGateway(data, this));
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
    newLoadBalancer(data) {
        console.info('New Load Balancer');
        this.load_balancers.push(new LoadBalancer(data, this));
        return this.load_balancers[this.load_balancers.length - 1];
    }
    getLoadBalancers() {
        return this.load_balancers;
    }
    getLoadBalancer(id='') {
        for (let artefact of this.getLoadBalancers()) {
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
    newLocalPeeringGateway(data) {
        console.info('New Local Peering Gateway');
        this.local_peering_gateways.push(new LocalPeeringGateway(data, this));
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
    newNATGateway(data) {
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
        this.nat_gateways.push(new NATGateway(data, this));
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
    newNetworkSecurityGroup(data) {
        console.info('New Network Security Group');
        this.network_security_groups.push(new NetworkSecurityGroup(data, this));
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
    newObjectStorageBucket(data) {
        console.info('New Object Storage Bucket');
        this.object_storage_buckets.push(new ObjectStorageBucket(data, this));
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
    newRouteTable(data) {
        console.info('New Route Table');
        this.route_tables.push(new RouteTable(data, this));
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
    newSecurityList(data) {
        console.info('New Security List');
        this.security_lists.push(new SecurityList(data, this));
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
    newServiceGateway(data) {
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
        this.service_gateways.push(new ServiceGateway(data, this));
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
    newSubnet(data) {
        console.info('New Subnet');
        this.subnets.push(new Subnet(data, this));
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
    newVirtualCloudNetwork(data) {
        console.info('New Virtual Cloud Network');
        this.virtual_cloud_networks.push(new VirtualCloudNetwork(data, this));
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
    getVcn(id='') {
        return this.getVirtualCloudNetwork(id);
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

    // Fragment
    newFragment(target) {
        console.info('New Fragment');
        return new Fragment(target, this);
    }

    /*
    ** Export Functions
     */
    // Terraform
    exportTerraform(callback=null) {}
    // Ansible
    exportAnsible(callback=null) {}
    // Resource Manager
    exportResourceManager(callback=null) {}

    /*
    ** Data Validation
     */
    validate(successCallback = null, errorCallback = null) {
        $.ajax({
            type: 'post',
            url: 'validate',
            dataType: 'text',
            contentType: 'application/json',
            data: JSON.stringify(this),
            success: function(resp) {
                console.info('Validation Response : ' + resp);
                if (successCallback && successCallback !== null) successCallback(JSON.parse(resp));
            },
            error: function(xhr, status, error) {
                console.info('Status : '+ status)
                console.info('Error : '+ error)
                if (errorCallback && errorCallback !== null) errorCallback(error);
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
** Model representation of each artefact within OCI
 */
class OkitArtifact {
    /*
    ** Create
     */
    constructor (okitjson) {
        this.getOkitJson = function() {return okitjson};
        // Add Id
        this.id = 'okit.' + this.constructor.name.toLowerCase() + '.' + uuidv4();
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
        if (this.parent_id !== undefined) {delete this.parent_id;}
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

    artefactToElement(name) {
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

    getChildren(artefact) {
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

/*
** Model Representation of OCI Regions
 */
class OkitRegions {
    /*
    ** Create
     */
    constructor() {
        this['us-sanjose-1'] = new OkitJson();
        this['us-phoenix-1'] = new OkitJson();
        this['us-ashburn-1'] = new OkitJson();
        this['uk-london-1'] = new OkitJson();
        this['sa-saopaulo-1'] = new OkitJson();
        this['me-jeddah-1'] = new OkitJson();
        this['eu-zurich-1'] = new OkitJson();
        this['eu-frankfurt-1'] = new OkitJson();
        this['eu-amsterdam-1'] = new OkitJson();
        this['ca-toronto-1'] = new OkitJson();
        this['ca-montreal-1'] = new OkitJson();
        this['ap-tokyo-1'] = new OkitJson();
        this['ap-sydney-1'] = new OkitJson();
        this['ap-seoul-1'] = new OkitJson();
        this['ap-osaka-1'] = new OkitJson();
        this['ap-mumbai-1'] = new OkitJson();
        this['ap-melbourne-1'] = new OkitJson();
        this['ap-hyderabad-1'] = new OkitJson();
        this['ap-chuncheon-1'] = new OkitJson();
    }
}
