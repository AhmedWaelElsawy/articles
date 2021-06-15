import { Injectable } from '@nestjs/common';

@Injectable()
export class StringsService {

    handleQuerySpecialChar(value: string): string {
        const newValue = [...value].map((char) => {
            if (char == `%` || char == `_`) {
                return '\\' + char
            }
            return char
        })
        return newValue.join('')
    }
}
