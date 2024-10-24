import { Injectable } from '@angular/core';
import { Format, IProfile, Resources } from './resources';
//TODO: instead of importing the values from the json file, we coulld use a http fetch. With this approach, we don't have an error when the repository is cloned and the json file is not present yet.
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

  getValues(key: keyof Resources): any {
    return this.getFormat(key).values;
  }

  getValue(field: any) {
    if (field.Description) return field.Value;
    return field;
  }

  /**
   * Returns a statistic which resources are used for the profiles.
   */
  createStatistic(resource: Resource) {
    const counter: Record<string, number> = {};
    this.getNames('Credential Profile').forEach((profile: any) => {
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
  getTooltip(value: any) {
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

  getType(value: any) {
    if (value.type) {
      return value.type;
    } else {
      const ref = value.allOf ? value.allOf[0].$ref : value.$ref;
      const res = JSON.parse(JSON.stringify(values.defs));
      const id = ref.split('/').pop();
      return res.definitions[id].type;
    }
  }
}
