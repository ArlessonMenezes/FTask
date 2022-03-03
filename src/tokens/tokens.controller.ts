import { Body, Controller, Put } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { IToken } from './interface/IToken';

@Controller('tokens')
export class TokensController {
    constructor(
        private readonly tokensService: TokensService,
    ) {}

    @Put('/refresh')
    async refreshToken(@Body() data: IToken): Promise<any> {
        return await this.tokensService.refreshToken(data.oldToken)
    }
}
