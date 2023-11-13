import wheels from "./WheelDescriptor";

export function GetDefaultSizeForWheel(resource :string, wheel: string) {
    const wheelsType = wheels[resource][wheel];
    return wheelsType.size;
}


