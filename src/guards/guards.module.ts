import { Global, Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class GuardsModule {}
