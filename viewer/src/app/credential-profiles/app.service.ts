import { Injectable } from '@angular/core';
import { Format, FormatValues, IProfile, Resources } from './resources';
import values from '../../assets/structure.json';
export type Resource =
  | 'Credential Format'
  | 'Signing Algorithm'
  | 'Status Algorithm'
  | 'Key Management (Issuer)'
  | 'Key Management (Holder)'
  | 'Issuance Protocol'
  | 'Presentation Protocol'
  | 'Trust Management';

interface Field {
  Description: boolean;
  Value: string;
}

interface TooltipElement {
  description: string;
  allOf: TooltipElement[];
  $ref: string;
}

interface TypeElement {
  type: string;
  allOf: TypeElement[];
  $ref: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public extraValues: Resource[] = [
    'Credential Format',
    'Signing Algorithm',
    'Status Algorithm',
    'Key Management (Issuer)',
    'Key Management (Holder)',
    'Issuance Protocol',
    'Presentation Protocol',
    'Trust Management',
  ];
  public mappedValues = {
    'Credential Format': 'credentialFormats',
    'Signing Algorithm': 'signingAlgorithms',
    'Status Algorithm': 'statusAlgorithms',
    'Key Management (Issuer)': 'keyManagements',
    'Key Management (Holder)': 'keyManagements',
    'Issuance Protocol': 'issuanceProtocols',
    'Presentation Protocol': 'presentationProtocols',
    'Trust Management': 'trustManagements',
  };

  getProfile(id: string): IProfile {
    return this.getFormat('Credential Profile').values[id] as IProfile;
  }

  getKey(key: string): keyof Resources {
    return key.startsWith('Key Management')
      ? 'Key Management'
      : (key as keyof Resources);
  }

  getElements(): Resources {
    return values;
  }

  getFormat(key: keyof Resources): Format {
    return this.getElements()[key];
  }

  getStructure(key: keyof Resources) {
    const values = this.getElements()[key].structure.properties;
    delete values['$schema'];
    return values;
  }

  getNames(key: keyof Resources): string[] {
    return Object.keys(this.getFormat(key).values);
  }

  getValues(key: keyof Resources): FormatValues {
    return this.getFormat(key).values;
  }

  getValue(field: Field) {
    if (field.Description) return field.Value;
    return field;
  }

  /**
   * Returns a statistic which resources are used for the profiles.
   */
  createStatistic(resource: Resource) {
    const counter: Record<string, number> = {};
    this.getNames('Credential Profile').forEach((profile: string) => {
      const subValue = this.getValues('Credential Profile')[profile][resource];
      if (subValue) {
        if (!counter[subValue]) {
          counter[subValue] = 1;
        }
        counter[subValue]++;
      }
    });
    return counter;
  }

  /**
   * Returns the tooltip based on the reference. Returns empty string in case we found none.
   * @param value
   * @returns
   */
  getTooltip(value: TooltipElement) {
    if (value.description) {
      return value.description;
    }
    if (value.allOf) {
      return value.allOf[1].description;
    }
    if (value.$ref) {
      const res = JSON.parse(JSON.stringify(values.defs));
      const id = value.$ref.split('/')[2];
      return res.definitions[id]?.description;
    }
    return '';
  }

  getType(value: TypeElement) {
    if (value.type) {
      return value.type;
    } else {
      const ref = value.allOf ? value.allOf[0].$ref : value.$ref;
      const res = JSON.parse(JSON.stringify(values.defs));
      const id = ref.split('/').pop() as string;
      return res.definitions[id].type;
    }
  }
}
