import { RenewableEnergyPurchases } from '@filecoin-renewable-energy-purchases/js-api'

const created = function() {
}

const computed = {
}

const watch = {
}

const mounted = async function() {
	/**
	 * Create an instance
	 */
	this.renewableEnergyPurchases = new RenewableEnergyPurchases()
	
	/**
	 * Ensure IPFS is up and running
	*/
	this.ipfs = await this.renewableEnergyPurchases.ensureIpfsIsRunning()

	/**
	 * Get contracts and allocations and print them out
	 * parameters: ()
	 */
	await this.printOutContractsAndAllocations()

	/**
	 * Get certificates and attestations and print them out
	 * parameters: ()
	 */
	await this.printOutCertificatesAndAttestations()
}

const methods = {
	async printOutContractsAndAllocations() {
		/**
		 * Get contracts and allocations
		 * parameters: ()
		 */
		const contractsAndAllocations = await this.renewableEnergyPurchases.getContractsAndAllocations()

		// Parse contracts and allocations object
		for (const contractsAndAllocationsKey of Object.keys(contractsAndAllocations)) {
			const contractsAndAllocationDag = await this.ipfs.dag.get(contractsAndAllocations[contractsAndAllocationsKey].order_cid)
			this.contractsAndAllocations[contractsAndAllocationsKey] = contractsAndAllocationDag.value
		}

		// Print out all contracts and allocations
		console.log(this.contractsAndAllocations)
	},
	async printOutCertificatesAndAttestations() {
		/**
		 * Get certificates and attestations
		 * parameters: ()
		 */
		const certificatesAndAttestations = await this.renewableEnergyPurchases.getCertificatesAndAttestations()

		// Parse certificates and attestations object
		for (const certificatesAndAttestationsKey of Object.keys(certificatesAndAttestations)) {
			const contractsAndAllocationDag = await this.ipfs.dag.get(certificatesAndAttestations[certificatesAndAttestationsKey].deliveries_cid)
			for (let certificateObj of contractsAndAllocationDag.value.certificates) {
				const certificateCid = await this.ipfs.dag.get(certificateObj.cid)
				certificateObj.certificate = certificateCid.value
			}
			this.certificatesAndAttestations[certificatesAndAttestationsKey] = contractsAndAllocationDag.value
		}

		// Print out all contracts and allocations
		console.log(this.certificatesAndAttestations)
	}
}

const destroyed = function() {
}

export default {
	mixins: [
	],
	components: {
	},
	directives: {
	},
	name: 'Example',
	data () {
		return {
			renewableEnergyPurchases: null,
			ipfs: null,
			contractsAndAllocations: {},
			certificatesAndAttestations: {}
		}
	},
	created: created,
	computed: computed,
	watch: watch,
	mounted: mounted,
	methods: methods,
	destroyed: destroyed
}
