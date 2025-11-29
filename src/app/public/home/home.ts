/**import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { VeiculoService, Veiculo } from '../../veiculo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
      <header style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2c3e50;">🚗 Loja de Veículos</h1>
        <p>Conectado com Backend Java ✅</p>
        
        <button 
          (click)="carregarVeiculos()" 
          style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 10px;"
          [disabled]="carregando">
          {{ carregando ? '🔄 Carregando...' : '🔄 Recarregar Veículos' }}
        </button>
      </header>

      <div *ngIf="carregando" style="text-align: center; padding: 40px;">
        <p>Carregando veículos do backend Java...</p>
      </div>

      <div *ngIf="erro" style="background: #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
        <p style="color: #e74c3c; margin: 0;">{{ erro }}</p>
        <button (click)="carregarVeiculos()" style="background: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 3px; cursor: pointer; margin-top: 10px;">
          Tentar Novamente
        </button>
      </div>

      <!-- Grid de Veículos - AGORA COM IMAGENS CORRETAS -->
      <div *ngIf="!carregando && veiculos.length > 0" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
        <div *ngFor="let veiculo of veiculos" 
             style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden; background: white;">
          
          <!-- IMAGEM - FORMA MAIS FÁCIL: pega a primeira foto da lista -->
          <div style="width: 100%; height: 200px; overflow: hidden;">
            <img 
             [src]="getPrimeiraImagem(veiculo)" 
  [alt]="veiculo.modelo"
  style="width: 100%; height: 100%; object-fit: cover;"
  (error)="onImageError($event)">
          </div>
          
          <div style="padding: 15px;">
            <h3 style="margin: 0 0 10px 0; color: #2c3e50;">{{ veiculo.marca }} {{ veiculo.modelo }}</h3>
            <p style="color: #7f8c8d; margin: 5px 0;">Ano: {{ veiculo.ano }}</p>
            <p style="font-size: 1.2em; font-weight: bold; color: #27ae60; margin: 10px 0;">
              R$ {{ veiculo.preco | number:'1.2-2' }}
            </p>
            <p style="color: #34495e; margin: 5px 0;">Cor: {{ veiculo.cor || 'Não informada' }}</p>
            
            <button 
              [routerLink]="['/public/details', veiculo.id]"
              style="background: #3498db; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; width: 100%; margin-top: 10px;">
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="veiculos.length === 0 && !carregando && !erro" style="text-align: center; padding: 40px;">
        <p>Nenhum veículo encontrado.</p>
        <button (click)="carregarVeiculos()" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
          Tentar Carregar Novamente
        </button>
      </div>
    </div>
  `
})
export class Home implements OnInit {
  veiculos: Veiculo[] = [];
  carregando: boolean = false;
  erro: string = '';

  constructor(
    private veiculoService: VeiculoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {
  this.carregando = true;
  this.erro = '';
  
  console.log('🎯 INICIANDO CARREGAMENTO...');
  

  this.veiculoService.getVeiculos().subscribe({
    next: (dados: Veiculo[]) => {
      console.log('✅ DADOS RECEBIDOS:', dados);



      // DEBUG DETALHADO
      dados.forEach((veiculo, index) => {
        console.log(`📸 Veículo ${index + 1}: ${veiculo.marca} ${veiculo.modelo}`);
        console.log('   - urlsFotos:', veiculo.urlsFotos);
        console.log('   - imagem:', veiculo.urlsFotos);
        console.log('   - URL final:', this.getPrimeiraImagem(veiculo));
      });
      this.veiculos = dados;
      this.carregando = false;
    },
    error: (erro: any) => {
      console.error('❌ ERRO COMPLETO:', erro);
      console.error('❌ Status:', erro.status);
      console.error('❌ Message:', erro.message);
      this.carregando = false;
      this.erro = 'Erro: ' + erro.message;
    },
    complete: () => {
      console.log('🔚 REQUISIÇÃO COMPLETADA');
    }
    });
  }

  // MÉTODO NOVO - PEGA A PRIMEIRA IMAGEM DA LISTA
 getPrimeiraImagem(veiculo: Veiculo): string {
  if (veiculo.urlsFotos && veiculo.urlsFotos.length > 0) {
    const foto = veiculo.urlsFotos[0];
    // Converte URL relativa para absoluta
    if (foto.startsWith('/')) {
      return 'http://localhost:8080' + foto;
    }
    return foto;
  }
  return 'http://localhost:8080/images/veiculos/bmw/bmw-x1.jpg';
}
onImageError(event: Event): void {
    // 2. Adicione a lógica de tratamento de erro da imagem aqui.
    // Exemplo: Substituir a imagem por uma imagem padrão (placeholder)
    const target = event.target as HTMLImageElement;
    if (target) {
        target.src = 'caminho/para/imagem-padrao.png'; // Substitua pelo caminho da sua imagem padrão
    }
    console.warn('Erro ao carregar a imagem:', event);
  }

}*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface VeiculoEmergencia {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  descricao: string;
  cor: string;
  imagemUrl: string;
}

@Component({
  selector: 'app-home-emergencia',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
      <h1>🚗 Loja de Veículos - Modo Emergência</h1>
      
      <button (click)="carregarVeiculosFake()" 
              style="background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
        🔄 Carregar Veículos (Fake)
      </button>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
        <div *ngFor="let veiculo of veiculos" 
             style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background: white;">
          
          <img [src]="veiculo.imagemUrl" 
               [alt]="veiculo.modelo"
               style="width: 100%; height: 200px; object-fit: cover; border-radius: 5px;">
          
          <h3>{{veiculo.marca}} {{veiculo.modelo}}</h3>
          <p>Ano: {{veiculo.ano}} | Preço: R$ {{veiculo.preco}}</p>
          <p>{{veiculo.descricao}}</p>
        </div>
      </div>
    </div>
  `
})
export class Home implements OnInit {
  veiculos: VeiculoEmergencia[] = [];

  ngOnInit() {
    this.carregarVeiculosFake();
  }

  carregarVeiculosFake() {
    // Dados MANUAIS com URLs ABSOLUTAS
    this.veiculos = [
      {
        id: 1,
        marca: 'BMW',
        modelo: 'X1',
        ano: 2023,
        preco: 250000,
        descricao: 'BMW X1 2023 - Luxo e performance',
        cor: 'Branco',
        imagemUrl: 'http://localhost:8080/images/bmw/bmw.webp'
      },
      {
        id: 2,
        marca: 'Renault', 
        modelo: 'Duster',
        ano: 2023,
        preco: 120000,
        descricao: 'Renault Duster 2023 - SUV robusto',
        cor: 'Vermelho',
        imagemUrl: 'http://localhost:8080/images/duster/duster.webp'
      }
    ];
    
    console.log('🚗 Veículos carregados (fake):', this.veiculos);
  }
}
