export interface WheelDescriptor {
	wheel : number[],
	size : number,
	startPosition?: number|undefined
}

export interface WheelKindDescriptor {
	[wheelKind : string] : WheelDescriptor,
}

export interface WheelsDescriptor {
	[resource: string] : WheelKindDescriptor
}

export const WheelKind = ["A","B","C"];

const wheels : WheelsDescriptor = 
{
	water: {
		A : {wheel:[0,0,1],size : 2}, 
		B : {wheel:[1,1,2],size : 2}, 
		C : {wheel:[1,3,3],size : 2, startPosition: 1}
	},
	food : { 
		A : {wheel: [1,1,2],size : 3},
		B : {wheel: [2,2,3],size : 2},
		C : {wheel: [3,3,4],size : 1, startPosition: 1}
	},
	wood : {
		A : {wheel: [1,1,2],size : 3},
		B : {wheel: [2,3,3],size : 4},
		C : {wheel: [4,5,5],size : 4} 
	},
	stone : {
		A : {wheel: [2,3,3],size : 5},
		B : {wheel: [4,5,6],size : 4}, 
		C : {wheel: [6,7,8],size : 3} 
	},
	spice	: {
		A : {wheel: [1,1,2],size : 3},
		B : {wheel: [5,6,7],size : 3},
		C : {wheel: [7,8,9],size : 3} 
	},
	silk	: {
		A : {wheel: [2,2,3],size : 4},
		B : {wheel: [3,4,5],size : 2},
		C : {wheel: [8,9,10],size : 2}
	}
};

export default wheels;