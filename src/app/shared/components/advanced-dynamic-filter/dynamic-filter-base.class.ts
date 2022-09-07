export interface DynamicFilterBase<T>{
	title: string;
	dynamicFilterInputs?: DynamicFilterInput<T>[];
	dynamicFilterBase?: DynamicFilterBase<T>[];
}

export class DynamicFilterInput<T> {
	value: T | undefined; // Preset input value, except date and range date
	key: string; // Key for input to define inputs
	label: string; // Input header
	order: number; // Order of placement in generated forms
	controlType: string; // Define input type in input class
	type: string; // Special type for textbox. Ex.: email
	required: boolean; // Definition a input is required   
	minLength: number; // Definition a input minimum length
	maxLength: number | null; // Definition a input maximum length
	validationPatern: string; // Definition a RegExp patern 
	placeholder:string; // Define placeholder for input
	options: string[]; // Array of values for combobox and dropdown

	constructor(options: {
			value?: T;
			key?: string;
			label?: string;
			required?: boolean;
			order?: number;
			controlType?: string;
			type?: string;
			minLength?: number;
			maxLength?: number | null;
			validationPatern?: string;
			placeholder?:string;
			options?: string[];
		} = {}) {
		this.value = options.value;
		this.key = options.key || '';
		this.label = options.label || '';
		this.required = !!options.required;
		this.order = options.order === undefined ? 1 : options.order;
		this.controlType = options.controlType || '';
		this.type = options.type || '';
		this.minLength = options.minLength || 0;
		this.maxLength = options.maxLength || null;
		this.validationPatern = options.validationPatern || '';
		this.placeholder = options.placeholder || '';
		this.options = options.options || [];
	}
}


