import { IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { SupportedChain } from "../intents.types";

const SUPPORTED_CHAINS: SupportedChain[] = [
  "stellar",
  "ethereum",
  "base",
  "polygon",
  "arbitrum",
  "optimism",
  "avalanche",
];

export class ListIntentsQueryDto {
  @ApiPropertyOptional({ description: "Filter by intent state" })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: "Filter by user Stellar address" })
  @IsOptional()
  @IsString()
  user?: string;

  @ApiPropertyOptional({ enum: SUPPORTED_CHAINS, description: "Filter by source chain" })
  @IsOptional()
  @IsIn(SUPPORTED_CHAINS)
  chain?: SupportedChain;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100, description: "Maximum number of intents to return" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 20;

  @ApiPropertyOptional({ default: 0, minimum: 0, description: "Number of intents to skip" })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number = 0;
}
